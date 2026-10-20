import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  access,
} from 'node:fs/promises';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const exists = async (file) => {
  try {
    await access(file);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
};

export async function seedCascade({
  source,
  target,
  version,
  log = console.log,
}) {
  // Even a partial/empty project directory belongs to the developer. Never merge or overwrite it.
  if (await exists(target)) {
    log('[kni-cascade] Existing SCSS preserved.');
    return false;
  }
  if (!(await exists(path.join(source, 'styles.scss')))) {
    throw new Error(
      'The installed kni-cascade package is missing scss/styles.scss.',
    );
  }
  await mkdir(path.dirname(target), { recursive: true });
  const staging = await mkdtemp(
    path.join(path.dirname(target), '.cascade-seed-'),
  );
  try {
    await cp(source, staging, { recursive: true });
    // A second setup process may have won the race while this one was copying.
    if (await exists(target)) return false;
    await rename(staging, target);
    log(
      `[kni-cascade] Seeded ${version} into ${target}. These files are now yours to customize.`,
    );
    return true;
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

function refreshCascade(project) {
  const args = [
    'install',
    'kni-cascade@1',
    '--save-dev',
    '--save-prefix=^',
    '--ignore-scripts',
    '--prefer-online',
    '--no-audit',
    '--no-fund',
  ];
  // Reuse npm's CLI across platforms and prevent recursive postinstall hooks.
  if (process.env.npm_execpath) {
    execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
      cwd: project,
      stdio: 'inherit',
    });
  } else {
    execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
      cwd: project,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
  }
}

export async function setupCascade({
  project = process.cwd(),
  refresh = refreshCascade,
  log = console.log,
} = {}) {
  const target = path.join(project, 'src/styles/scss');
  if (await exists(target)) {
    log('[kni-cascade] Existing SCSS preserved.');
    return;
  }
  log('[kni-cascade] First setup: fetching the latest stable 1.x release...');
  await refresh(project);
  const require = createRequire(path.join(project, 'package.json'));
  const packageFile = require.resolve('kni-cascade/package.json');
  const pkg = JSON.parse(await readFile(packageFile, 'utf8'));
  await seedCascade({
    source: path.join(path.dirname(packageFile), 'scss'),
    target,
    version: pkg.version,
    log,
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  setupCascade().catch((error) => {
    console.error('[kni-cascade] Setup failed:', error.message);
    process.exitCode = 1;
  });
}

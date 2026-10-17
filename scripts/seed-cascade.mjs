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

async function main() {
  const project = process.cwd();
  const target = path.join(project, 'src/styles/scss');
  if (await exists(target)) {
    console.log('[kni-cascade] Existing SCSS preserved.');
    return;
  }
  const require = createRequire(path.join(project, 'package.json'));
  const packageFile = require.resolve('kni-cascade/package.json');
  const pkg = JSON.parse(await readFile(packageFile, 'utf8'));
  await seedCascade({
    source: path.join(path.dirname(packageFile), 'scss'),
    target,
    version: pkg.version,
  });
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error('[kni-cascade] Setup failed:', error.message);
    process.exitCode = 1;
  });
}

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  readdir,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { seedCascade, setupCascade } from '../scripts/seed-cascade.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cascade-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = path.join(root, 'package/scss');
  const target = path.join(root, 'project/src/styles/scss');
  await mkdir(path.join(source, '00-sass'), { recursive: true });
  await writeFile(path.join(source, 'styles.scss'), "@use './00-sass';");
  await writeFile(path.join(source, '00-sass/_variables.scss'), '$example: 1;');
  return { root, source, target, version: '1.5.1', log: () => {} };
}

test('seeds nested Sass once and preserves project edits on subsequent installs', async (t) => {
  const options = await fixture(t);
  assert.equal(await seedCascade(options), true);
  const variables = path.join(options.target, '00-sass/_variables.scss');
  assert.equal(await readFile(variables, 'utf8'), '$example: 1;');
  await writeFile(variables, '$example: 99;');
  assert.equal(await seedCascade({ ...options, version: '1.6.0' }), false);
  assert.equal(await readFile(variables, 'utf8'), '$example: 99;');
  assert.deepEqual(await readdir(path.dirname(options.target)), ['scss']);
});

test('preserves an existing empty directory rather than silently overwriting it', async (t) => {
  const options = await fixture(t);
  await mkdir(options.target, { recursive: true });
  assert.equal(await seedCascade(options), false);
  assert.deepEqual(await readdir(options.target), []);
});

test('fails clearly when the installed package lacks its Sass entry', async (t) => {
  const options = await fixture(t);
  await rm(path.join(options.source, 'styles.scss'));
  await assert.rejects(seedCascade(options), /missing scss\/styles.scss/);
});

test('first setup refreshes Cascade before resolving and copying its Sass', async (t) => {
  const options = await fixture(t);
  const project = path.join(options.root, 'project');
  let refreshes = 0;
  await setupCascade({
    project,
    log: () => {},
    refresh: async (cwd) => {
      assert.equal(cwd, project);
      refreshes++;
      const pkg = path.join(project, 'node_modules/kni-cascade');
      await mkdir(path.join(pkg, 'scss'), { recursive: true });
      await writeFile(
        path.join(pkg, 'package.json'),
        JSON.stringify({ name: 'kni-cascade', version: '1.10.0' }),
      );
      await writeFile(path.join(pkg, 'scss/styles.scss'), '$fresh: true;');
    },
  });
  assert.equal(refreshes, 1);
  assert.equal(
    await readFile(path.join(options.target, 'styles.scss'), 'utf8'),
    '$fresh: true;',
  );
});

test('existing empty or edited Sass skips package refresh entirely', async (t) => {
  const options = await fixture(t);
  const project = path.join(options.root, 'project');
  const setup = () =>
    setupCascade({
      project,
      log: () => {},
      refresh: () => {
        assert.fail('An initialized project must not refresh Cascade');
      },
    });
  await mkdir(options.target, { recursive: true });
  await setup();
  await writeFile(path.join(options.target, 'styles.scss'), '$custom: 99;');
  await setup();
  assert.equal(
    await readFile(path.join(options.target, 'styles.scss'), 'utf8'),
    '$custom: 99;',
  );
});

test('first-setup refresh failures propagate without seeding old Sass', async (t) => {
  const options = await fixture(t);
  await assert.rejects(
    setupCascade({
      project: path.join(options.root, 'project'),
      log: () => {},
      refresh: () => {
        throw new Error('registry unavailable');
      },
    }),
    /registry unavailable/,
  );
  await assert.rejects(readFile(path.join(options.target, 'styles.scss')), {
    code: 'ENOENT',
  });
});

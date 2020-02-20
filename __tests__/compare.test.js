import compareFiles from '../src/index.js';

const beforeFilepath = '/home/galina/Документы/HEXLET/backend-project-lvl2/fixtures/before.json';
const afterFilepath = '/home/galina/Документы/HEXLET/backend-project-lvl2/fixtures/after.json';

test('compareFiles', () => {
  const expected = `{
  - robot: hobot,
  + robot: hobot-hobot,
  - deleted: noooooo!,
  + new: wow!
}`;
  expect(compareFiles(beforeFilepath, afterFilepath)).toBe(expected);
});

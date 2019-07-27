import { rotate, encrypt, zip } from "../src/core/vigenere-cipher";

test('zip', () => {
  expect(zip(['a'], ['b'])).toStrictEqual([['a', 'b']]);
  expect(zip(['a'], [1])).toStrictEqual([['a', 1]]);
  expect(zip(['a', 'b'], [1, 2])).toStrictEqual([['a', 1], ['b', 2]]);
});

test('rotate', () => {
  expect(rotate(['a', 'b'], 0)).toStrictEqual(['a', 'b']);
  expect(rotate(['a', 'b'], 1)).toStrictEqual(['b', 'a']);
  expect(rotate(['a', 'b'], 2)).toStrictEqual(['a', 'b']);
  expect(rotate(['a', 'b'], 3)).toStrictEqual(['b', 'a']);

  expect(rotate(['a', 'b'], -1)).toStrictEqual(['b', 'a']);
  expect(rotate(['a', 'b'], -2)).toStrictEqual(['a', 'b']);
  expect(rotate(['a', 'b'], -3)).toStrictEqual(['b', 'a']);
});

test('encrypt', () => {
  expect(encrypt('hi', 'a')).toStrictEqual('HI');
  expect(encrypt('hi pie', 'a')).toStrictEqual('HI PIE');
  expect(encrypt('hi pie', 'b')).toStrictEqual('IJ QJF');
  expect(encrypt('hi pie', 'ab')).toStrictEqual('HJ PJE');
});

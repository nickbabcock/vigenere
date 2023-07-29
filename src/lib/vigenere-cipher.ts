const aCharCode = "A".charCodeAt(0);
const zCharCode = "Z".charCodeAt(0);
const asciiAlpha = /[A-Za-z]/;

// Zip two arrays together to form an array of two element tuples
export function zip<T1, T2>(a: T1[], b: T2[]): [T1, T2][] {
  return a.map((x, i) => [x, b[i]]);
}

// Rotate array element a given number of spots to the right
export function rotate<T>(arr: T[], spots: number): T[] {
  let rot = spots % arr.length;
  return arr.slice(rot, arr.length).concat(arr.slice(0, rot));
}

// Perform the vigenere cipher on given plaintext with a key
export function encrypt(text: string, rawKey: string): string {
  const key = rawKey.toUpperCase();
  let skipSpaces = 0;
  return text
    .toUpperCase()
    .split("")
    .map((val, ind) => {
      if (!asciiAlpha.test(val)) {
        skipSpaces += 1;
        return val;
      }

      const keyChar = key.charCodeAt((ind - skipSpaces) % key.length);
      const c = (val.charCodeAt(0) + keyChar) % 26;
      return String.fromCharCode(aCharCode + c);
    })
    .join("");
}

// Decrypt vigenere ciphertext with a given key
export function decrypt(ciphertext: string, rawKey: string): string {
  const key = rawKey.toUpperCase();
  let skipSpaces = 0;
  return ciphertext
    .toUpperCase()
    .split("")
    .map((val, ind) => {
      if (!asciiAlpha.test(val)) {
        skipSpaces += 1;
        return val;
      }

      const keyChar = key.charCodeAt((ind - skipSpaces) % key.length);
      const c = (val.charCodeAt(0) - keyChar + 26) % 26;
      return String.fromCharCode(aCharCode + c);
    })
    .join("");
}

// Split the ciperhtext into a given number of groups with the letters
// distributed uniformly in a sequential and round-robin fashion
export function cosets(text: string, num: number): string[][] {
  const result: string[][] = new Array(num).fill(0).map(() => []);
  const chars = text.split("");
  for (let i = 0; i < chars.length; i++) {
    result[i % num].push(chars[i]);
  }

  return result;
}

// Frequency count of a coset
function frequencyCount(coset: string[]): number[] {
  const counts = new Array(26).fill(0);
  for (let letter of coset) {
    counts[letter.charCodeAt(0) - aCharCode] += 1;
  }
  return counts;
}

// Index of coincidence for a coset
export function coincidenceIndex(coset: string[]): number {
  const fc = frequencyCount(coset);
  const sum = fc.map((x) => x * (x - 1)).reduce((acc, x) => acc + x);
  return sum / (coset.length * (coset.length - 1));
}

// Give an estimate of a potential key length of a cipher text. The algorithm
// works by finding which coset length has the greatest index of coincidence.
export function estimateKeyLength(cipherText: string, maxLen: number): number {
  const indices = new Array(maxLen).fill(0).map((x, i) => {
    const cis = cosets(cipherText, i + 1).map((x) => coincidenceIndex(x));
    return cis.reduce((a, b) => a + b, 0) / cis.length;
  });

  return Math.max(indices.indexOf(Math.max(...indices)) + 1, 1);
}

// Computes the shift of a coset by finding the smallest chi-squared test
// against the actual frequency of letters in the english alphabet.
// Reference: https://pages.mtu.edu/~shene/NSF-4/Tutorial/VIG/Vig-Recover.html
export function cosetShift(coset: string[]): number {
  const freq = [
    0.08167, // A
    0.01492, // B
    0.02782,
    0.04253,
    0.12702,
    0.02228,
    0.02015,
    0.06094,
    0.06996,
    0.00153,
    0.00772,
    0.04025,
    0.02406,
    0.06749,
    0.07507,
    0.01929,
    0.00095,
    0.05987,
    0.06327,
    0.09056,
    0.02758,
    0.00978,
    0.0236,
    0.0015,
    0.01974,
    0.00074,
  ];

  const chi = new Array(26).fill(0).map((_, i) => {
    const shift = coset
      .map((x) => x.charCodeAt(0) - i)
      .map((x) => zCharCode - ((zCharCode - x) % 26))
      .map((x) => String.fromCharCode(x));
    const fc = frequencyCount(shift);
    return fc
      .map((x, i) => (x / coset.length - freq[i]) ** 2 / freq[i])
      .reduce((acc, x) => acc + x);
  });

  return chi.indexOf(Math.min(...chi));
}

export interface VigenereRecovery {
  key: string;
  plainText: string;
}

export function recoverVigenere(
  cipherText: string,
  maxKeyLen: number,
): VigenereRecovery {
  const slim = cipherText.replace(/[^A-Za-z]/g, "");
  const keyLen = estimateKeyLength(slim, maxKeyLen);
  const coset = cosets(slim, keyLen);
  const key = coset
    .map((x) => cosetShift(x))
    .map((x) => String.fromCharCode(aCharCode + x))
    .join("");
  const plainText = decrypt(cipherText, key);
  return { key, plainText };
}

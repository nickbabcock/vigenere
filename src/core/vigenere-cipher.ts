const aCharCode = 65;

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
export function encrypt(text: string, raw_key: string): string  {
  const key = raw_key.toUpperCase();
  let spacesEncountered = 0;
  return text.toUpperCase().split('').map((val, ind) => {
    if (val === ' ') {
      spacesEncountered += 1;
      return ' ';
    }

    const keyChar = key.charCodeAt((ind - spacesEncountered) % key.length);
    const valChar = val.charCodeAt(0);
    return String.fromCharCode(valChar + (keyChar - aCharCode));
  }).join('');
}

// Decrypt vigenere ciphertext with a given key
export function decrypt(ciphertext: string, raw_key: string): string {
  const key = raw_key.toUpperCase();
  let spacesEncountered = 0;
  return ciphertext.toUpperCase().split('').map((val, ind) => {
    if (val === ' ') {
      spacesEncountered += 1;
      return ' ';
    }

    const car = key.charCodeAt((ind - spacesEncountered) % key.length);
    const c = (val.charCodeAt(0) - car + 26) % 26;
    return String.fromCharCode(aCharCode + c);
  }).join('');
}

function crackCipher(raw_text: string, maxKeyLength: number): string {
  let i;
  const text = raw_text.replace(/\s/g, '');
  const keyLength = getKeyLength(text, maxKeyLength);
  const key = [];

  for (i = 0; i < keyLength; i++) {
    const filteredText = [];
    for (let j = i; j < text.length; j += keyLength) {
      filteredText.push(text[j]);
    }
    key.push(crackCaesar(filteredText));
  }

  return key.join('');
}

function crackCaesar(caesar: string[]) {
  const freq: Record<string, number> = {
    A: 8.167,
    B: 1.492,
    C: 2.782,
    D: 4.253,
    E: 12.702,
    F: 2.228,
    G: 2.015,
    H: 6.094,
    I: 6.996,
    J: 0.153,
    K: 0.772,
    L: 4.025,
    M: 2.406,
    N: 6.749,
    O: 7.507,
    P: 1.929,
    Q: 0.095,
    R: 5.987,
    S: 6.327,
    T: 9.056,
    U: 2.758,
    V: 0.978,
    W: 2.36,
    X: 0.15,
    Y: 1.974,
    Z: 0.074
  };

  let evals = new Array(26);
  for (let x = 0; x < evals.length; x++) {
    let i;
    const shift = [];
    for (i = 0; i < caesar.length; i++) {
      const car = (caesar[i].charCodeAt(0) % aCharCode) + x;
      shift.push(String.fromCharCode((car % 26) + aCharCode));
    }

    const groups: Record<string, number> = {};
    for (i = 0; i < shift.length; i++) {
      groups[shift[i]] = (groups[shift[i]] || 0) + 1;
    }

    const res = Object.entries(freq)
      .map(val => (freq[val[0]] - (val[1] * 100) / caesar.length) ** 2)
      .reduce((memo, num) => memo + num, 0);

    evals[x] = res;
  }

  return String.fromCharCode(26 - evals.lastIndexOf(Math.min(...evals)) + aCharCode);
}

function getKeyLength(text: string, maxKeyLength: number): number {
  const kap = 0.0667;
  const props = 
    getMatches(text, maxKeyLength).map(
        val => (kap - val / text.length) ** 2
      );
  return props.indexOf(Math.min(...props)) + 1;
}

function getMatches(text: string, maxKeyLength: number): number[] {
  const equalPair = (memo: number, val: string[]) => memo + (val[0] === val[1] ? 1 : 0);
  const keys = [];
  const chars = text.split('');
  for (let i = 1; i <= maxKeyLength; i++) {
    const rot = rotate(chars, i);
    const matches = zip(chars, rot).reduce(equalPair, 0);
    keys.push(matches);
  }
  return keys;
}

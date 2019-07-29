[![Build Status](https://dev.azure.com/nbabcock19/nbabcock19/_apis/build/status/nickbabcock.vigenere?branchName=master)](https://dev.azure.com/nbabcock19/nbabcock19/_build/latest?definitionId=6&branchName=master)

# Vigenère Cipher

The [Vigenère Cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) is a slightly more complex version of the [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher), where instead of rotating plaintext by a single letter, Vigenère allows rotation by words. Despite the increase in intricacy, both Vigenère and Caesar ciphers are susceptible to frequency analysis. One can recover the plaintext and the key given sufficiently long enough ciphertext due to inherent patterns in english text. [Dr. C.-K. Shene breaks down how this method works](https://pages.mtu.edu/~shene/NSF-4/Tutorial/index.html).

This repo is a [hosted web page](https://vigenere.nickb.dev) that allows one to play with encryption, decryption, and recovery of Vigenère ciphers.

## Examples

The simplest Vigenère cipher is the identity caesar cipher. Encrypting:

```
hello
```

with a key of

```
a
```

Results in

```
hello
```

Not very exciting. Instead we can use a key of `b` to receive:

```
IFMMP
```

The flaw with single letter keys is that there are only 26 possible outputs, which makes reverse engineering very easy. Vigenère improves upon this schematic by using longer keys. Let's encrypt with the key `abc`:

```
HFNLP
```

Much harder to crack as the realm of keys is much greater. It is still possible to recover the plaintext and the key used in encryption by observing patterns in english text. Though our example is not long enough to be representative of typical english writing (a brute force method + dictionary lookup would be more apt, but that is outside the scope of this project).

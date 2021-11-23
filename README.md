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

Let's say we were given the following ciphertext -- note that spacing and punctuation does not matter (the ciphertext could be all one word):

> IIEHSAB YTP HRO OONQP EKLVP HOO O MPUF WEPOZM WCLLRODVED ZY VWMEP CB UIPDA
> SAACOWKTRU SQ NVWFRNWLV. MTBCZVJ ZHW PYRAOIPG AS OLFYM SJ WOI PLGEBVDV
> VTPYBAGJ LQK HFNHEZZEB VJ STG PSDAHY XSZICV EZ GPWAZGEHZZQ JSFWR KTWPU H
> KCPOPSI NRUXCLGP HF SLZ SHY OJR KSRBKS HWPV YTV VAY SS JSMPU HTAPONSU
> OLZWLEWOTZPG. VR ESS OHIPQNXS ZT ZOINB'Z VPRONR STQNPPJ VWR KSH MMCXSOH
> IPOPEYNS WBU ZI OMD UIZUVXHUX ESS DWXSHZX ZAWJWFY. LU YYOSNGKLQKMYR RWFTJ ZHW
> ESS OIGPUPSC. MWJUCPB DED MM JC DPDUW OPTEQZPQA FFE RWFTJ ZHW NWSRSI. SH DED
> LH PVV DDTI ETAA VRFJOXJ CSOSIGHK EYO TWGKTGPSFD OJR YTV TEYYSNG KSRBKS
> HSHZ-SCHK APCS JCK TQCMETBC. WE EKHX CPGLSTE KPW QCWABU SDK KCPOPZP EKL
> EOGOJHRRH. IMYRZAM NLV ZYCP CB PVTQN PTVSZ KYPULZPC VA OGAHHVPO RWFTJ ZHW
> NZBPWEFDSPJ RWRWER RMJPYGA.

Running this decryption with a max key length of 20 reveals a passage from pride and prejudice encrypted with a key of `helloworld`:

> BETWEEN HIM AND DARCY THERE WAS A VERY STEADY FRIENDSHIP IN SPITE OF GREAT
> OPPOSITION OF CHARACTER. BINGLEY WAS ENDEARED TO DARCY BY THE EASINESS
> OPENNESS AND DUCTILITY OF HIS TEMPER THOUGH NO DISPOSITION COULD OFFER A
> GREATER CONTRAST TO HIS OWN AND THOUGH WITH HIS OWN HE NEVER APPEARED
> DISSATISFIED. ON THE STRENGTH OF DARCY'S REGARD BINGLEY HAD THE FIRMEST
> RELIANCE AND OF HIS JUDGEMENT THE HIGHEST OPINION. IN UNDERSTANDING DARCY WAS
> THE SUPERIOR. BINGLEY WAS BY NO MEANS DEFICIENT BUT DARCY WAS CLEVER. HE WAS
> AT THE SAME TIME HAUGHTY RESERVED AND FASTIDIOUS AND HIS MANNERS THOUGH
> WELL-BRED WERE NOT INVITING. IN THAT RESPECT HIS FRIEND HAD GREATLY THE
> ADVANTAGE. BINGLEY WAS SURE OF BEING LIKED WHEREVER HE APPEARED DARCY WAS
> CONTINUALLY GIVING OFFENSE.
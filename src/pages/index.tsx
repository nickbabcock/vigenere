import type { NextPage } from "next";
import Head from "next/head";
import { Cipher } from "../features/cipher";
import styles from "../styles/index.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.content}>
      <Head>
        <title>Vigenère Cipher</title>
        <meta
          name="description"
          content="Online encryption, decryption, and recovery of ciphertext with vigenere / caesar ciphers using frequency analysis"
        />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Vigenère Cipher</h1>
      <p>
        The{" "}
        <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher">
          Vigenère Cipher
        </a>{" "}
        is a slightly more complex version of the{" "}
        <a href="https://en.wikipedia.org/wiki/Caesar_cipher">Caesar Cipher</a>,
        where instead of rotating plaintext by a single letter, Vigenère allows
        rotation by words. Despite the increase in intricacy, both Vigenère and
        Caesar ciphers are susceptible to frequency analysis. One can recover
        the plaintext and the key given sufficiently long enough ciphertext due
        to inherent patterns in english text.{" "}
        <a href="https://pages.mtu.edu/~shene/NSF-4/Tutorial/index.html">
          Dr. C.-K. Shene breaks down how this method works
        </a>
        .
      </p>
      <p>
        Any code suggestions or issues can be{" "}
        <a href="https://github.com/nickbabcock/vigenere">raised on Github</a>
      </p>
      <Cipher />
    </div>
  );
};

export default Home;

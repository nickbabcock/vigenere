import type { NextPage } from "next";
import Head from "next/head";
import { Cipher } from "../features/cipher";
import Link from "next/link";
import { GithubIcon } from "../components/GithubIcon";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col gap-y-4 px-3 pb-3 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
      <Head>
        <title>Vigenère Cipher</title>
        <meta
          name="description"
          content="Online encryption, decryption, and recovery of ciphertext with vigenere / caesar ciphers using frequency analysis"
        />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto max-w-prose space-y-4">
        <div className="flex">
          <h1 className="grow text-4xl font-extrabold">Vigenère Cipher</h1>
          <Link href="https://github.com/nickbabcock/vigenere">
            <GithubIcon
              className="h-8 w-8 dark:fill-white"
              alt="XPick Github Repo"
            />
          </Link>
        </div>
        <p className="text-lg">
          The{" "}
          <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher">
            Vigenère Cipher
          </a>
          , encrypts text with an incrementing{" "}
          <a href="https://en.wikipedia.org/wiki/Caesar_cipher">
            Caesar Cipher
          </a>
          . One can leverage frequency analysis to recover the plaintext and the
          key given sufficiently long ciphertext due to inherent patterns in
          english text.{" "}
          <a href="https://pages.mtu.edu/~shene/NSF-4/Tutorial/index.html">
            Dr. C.-K. Shene breaks down how this method works
          </a>
          .
        </p>
      </div>
      <Cipher />
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import { Cipher } from "../features/cipher";
import Link from "next/link";
import { GithubIcon } from "../components/GithubIcon";

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:py-14">
      <Head>
        <title>Vigenère Cipher</title>
        <meta
          name="description"
          content="Online encryption, decryption, and recovery of ciphertext with vigenere / caesar ciphers using frequency analysis"
        />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Vigenère Cipher
          </h1>
          <Link
            href="https://github.com/nickbabcock/vigenere"
            aria-label="View source on GitHub"
            className="shrink-0 rounded-md p-1.5 text-soft transition-colors hover:text-ink"
          >
            <GithubIcon
              className="h-6 w-6 fill-current"
              alt="Vigenère GitHub repository"
            />
          </Link>
        </div>
        <p className="max-w-prose leading-relaxed text-soft">
          The{" "}
          <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher">
            Vigenère Cipher
          </a>{" "}
          encrypts text with an incrementing{" "}
          <a href="https://en.wikipedia.org/wiki/Caesar_cipher">Caesar Cipher</a>
          . Given sufficiently long ciphertext, frequency analysis can recover
          both the plaintext and the key by exploiting the inherent patterns of
          English text.{" "}
          <a href="https://pages.mtu.edu/~shene/NSF-4/Tutorial/index.html">
            Dr. C.-K. Shene breaks down how this method works
          </a>
          .
        </p>
      </header>

      <main className="flex grow flex-col">
        <Cipher />
      </main>
    </div>
  );
};

export default Home;

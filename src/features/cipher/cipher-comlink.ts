import { expose } from "comlink";
import { encrypt, decrypt, recoverVigenere } from "../../lib/vigenere-cipher";

const mod = { encrypt, decrypt, recoverVigenere };
expose(mod);
export type CipherWorker = typeof mod;

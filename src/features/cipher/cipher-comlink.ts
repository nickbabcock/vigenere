import { expose } from "comlink";
import * as mod from "./cipher-worker";

expose(mod);
export type CipherWorker = typeof mod;
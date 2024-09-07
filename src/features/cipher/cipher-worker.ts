import { wrap } from "comlink";
import { CipherWorker } from "./cipher-comlink";

function createWorker() {
  const rawWorker = new Worker(new URL("./cipher-comlink", import.meta.url));
  return wrap<CipherWorker>(rawWorker);
}

let worker: undefined | ReturnType<typeof createWorker>;
export function getWorker() {
  return (worker ??= createWorker());
}

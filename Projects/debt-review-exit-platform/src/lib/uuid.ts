// RFC 4122 v4 UUID generator. Works in Node and Edge runtimes.
export default function uid(): string {
  const g = globalThis as { crypto?: { randomUUID?: () => string } };
  if (g.crypto?.randomUUID) return g.crypto.randomUUID();
  // Node fallback
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("crypto").randomUUID() as string;
}

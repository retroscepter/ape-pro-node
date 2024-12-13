export function exhaustiveGuard(_value: never) {
  throw new Error("Unreachable code: " + JSON.stringify(_value));
}

import { withBase } from "./base-path";

export const logos = {
  wordmarkWhite: withBase("/brand/wordmark-white.png"),
  wordmarkBlack: withBase("/brand/wordmark-black.png"),
  mark: withBase("/brand/mark-square.png"),
  arms: withBase("/brand/mark-arms-white.png"),
} as const;

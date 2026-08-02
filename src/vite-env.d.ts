/// <reference types="vite/client" />

/*
 * React 18's DOM typings predate `inert`. The attribute is what keeps a
 * collapsed accordion panel out of the tab order while it is still laid out,
 * so it is declared here rather than cast away at each call site.
 */
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- must match React's own signature
  interface HTMLAttributes<T> {
    inert?: '' | undefined;
  }
}

export {};

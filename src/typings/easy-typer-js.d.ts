// src/typings/easy-typer-js.d.ts
declare module 'easy-typer-js' {
  class EasyTyper {
    constructor(
      obj: any,
      text: string,
      onStart?: () => void,
      onComplete?: () => void
    );
    destroy(): void; // 如果 EasyTyper 有 destroy 方法，可以在这里声明
  }

  export = EasyTyper;
}
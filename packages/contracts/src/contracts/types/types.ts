export interface HelloState {
  [creator: string]: string;
}

export interface HelloAction {
  input: HelloInput;
  caller: string;
}

export interface HelloInput {
  function: HelloFunction;
  id: string;
  name: string;
}

export type HelloResult = string;

export type HelloFunction = 'helloRead' | 'helloWrite';

export type ContractResult = { state: HelloState } | { result: HelloResult };

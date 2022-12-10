import { helloRead } from './actions/read/helloRead';
import { helloWrite } from './actions/write/helloWrite';
import { ContractResult, HelloAction, HelloState } from './types/types';

declare const ContractError;

export async function handle(state: HelloState, action: HelloAction): Promise<ContractResult> {
  const input = action.input;

  switch (input.function) {
    case 'helloWrite':
      return await helloWrite(state, action);
    case 'helloRead':
      return await helloRead(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
}

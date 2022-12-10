import { ContractResult, HelloAction, HelloState } from '../../types/types';

declare const ContractError;

export const helloRead = async (state: HelloState, { input: { id } }: HelloAction): Promise<ContractResult> => {
  const hello = state[id];

  if (!hello) {
    throw new ContractError(`Creator with id: ${id} does not exist`);
  }

  return { result: hello };
};

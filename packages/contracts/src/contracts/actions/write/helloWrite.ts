import { HelloAction, HelloState, ContractResult } from '../../types/types';

declare const ContractError;

export const helloWrite = async (
  state: HelloState,
  { caller, input: { name } }: HelloAction
): Promise<ContractResult> => {

  if (!name) {
    throw new ContractError(`Creator must provide a name.`);
  }

  if (state[caller]) {
    throw new ContractError(`Creator already added.`)
  }

  state[caller] = name

  return { state };
};

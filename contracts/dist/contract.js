(() => {
  // src/contracts/actions/read/helloRead.ts
  var helloRead = async (state, { input: { id } }) => {
    const hello = state[id];
    if (!hello) {
      throw new ContractError(`Creator with id: ${id} does not exist`);
    }
    return { result: hello };
  };

  // src/contracts/actions/write/helloWrite.ts
  var helloWrite = async (state, { caller, input: { name } }) => {
    if (!name) {
      throw new ContractError(`Creator must provide a name.`);
    }
    if (state[caller]) {
      throw new ContractError(`Creator already added.`);
    }
    state[caller] = name;
    return { state };
  };

  // src/contracts/contract.ts
  async function handle(state, action) {
    const input = action.input;
    switch (input.function) {
      case "helloWrite":
        return await helloWrite(state, action);
      case "helloRead":
        return await helloRead(state, action);
      default:
        throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
    }
  }
})();

import { useEffect, useState } from "react";
import { defaultCacheOptions, WarpFactory } from "warp-contracts/web";
import "./App.css";

const warp = WarpFactory.forMainnet({ ...defaultCacheOptions, inMemory: true });
const contractId = "N4G1F2ftAbArKpS5iHjPSuOY7GMQvyiEIcS-W4CVLbk";

const getContract = async () => {
  const wallet = await warp.arweave.wallets.generate();
  const contract = await warp.contract(contractId).connect(wallet);

  return contract;
};

const getState = async (contract) => {
  const { cachedValue } = await contract.readState();
  const state = cachedValue.state;
  return state;
};

function App() {
  const [contractState, setContractState] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchContractData() {
      const contract = await getContract();
      const state = await getState(contract);
      setContractState((prevState) => ({ ...prevState, state }));
    }
    fetchContractData();
  }, []);

  const addContent = async (e) => {
    e.preventDefault();
    if (!name) {
      return;
    } else {
      const contract = await getContract();
      await contract.writeInteraction({
        function: "helloWrite",
        name: name,
      });
      const state = await getState(contract);
      setContractState((prevState) => ({ ...prevState, state }));
      setName("");
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className="App">
      <div className="form">
        <form onSubmit={addContent}>
          <label htmlFor="name">Say Something: </label>
          <input
            className="content-input"
            placeholder="Type something here..."
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <button className="p-4 border border-red-600" type="submit">
            Add
          </button>
        </form>
      </div>
      {contractState.state && (
        <div className="state-items">
          {Object.keys(contractState.state).map((keyName) => (
            <p className="state-item" key={keyName}>
              <p className="text-red-600 cursor-pointer">{keyName}</p>
              Content: {contractState.state[keyName]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

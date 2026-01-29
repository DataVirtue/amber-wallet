import { JsonRpcProvider } from "ethers";


export const ethProvider = new JsonRpcProvider(
  import.meta.env.VITE_ALCHEMY_ETH_URL,
  { name: "mainnet", chainId: 1, ensAddress: undefined }
);

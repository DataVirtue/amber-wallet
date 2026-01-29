import { JsonRpcProvider } from "ethers";

export const ethProvider = new JsonRpcProvider(
  "https://eth.llamarpc.com",
  { name: "mainnet", chainId: 1, ensAddress: undefined }
);

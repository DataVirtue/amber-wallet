import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { ethers, hexlify, computeAddress } from "ethers";
import { HDKey } from "@scure/bip32";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { ethProvider } from "./ethprovider.ts"

export type Blockchain = "solana" | "ethereum";
export const DERIVATION_PATHS: Record<Blockchain, string> = {
  'solana': `m/44'/501'/0/0`,
  'ethereum': `m/44'/60'/0/0`
}

export interface Wallet {
  srno: number,
  publicKey?: string | null,
  privateKey?: string | null,
  chain: Blockchain,
  currentBalance?: number,
  getBalance(): Promise<number>
}


export interface SolanaWallet extends Wallet {
  chain: "solana"
}
export interface EthereumWallet extends Wallet {
  chain: "ethereum"
}
export const createSolanaWallet = (
  srno: number,
  publicKey: string,
  privateKey: string

): SolanaWallet => ({
  srno,
  chain: "solana",
  publicKey,
  privateKey,
  async getBalance() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    if (publicKey) {
      return 0;
    }
    const pk = new PublicKey(publicKey);
    console.log("PK...", pk.toBase58())


    let balance = 0;
    try {
      balance = await connection.getBalance(pk);

    } catch (e) {
      console.log("Error getting balance", e)
    }
    return balance / 1e9
  },
})

export const createEthereumWallet = (
  srno: number,
  publicKey: string,
  privateKey: string

): EthereumWallet => ({
  srno,
  chain: "ethereum",
  publicKey,
  privateKey,
  async getBalance() {
    const balanceWei = await ethProvider.getBalance(computeAddress(publicKey))
    return Number(ethers.formatEther(balanceWei));
  },
})


export function generateWallets(chain: Blockchain, no_wallets: number, seed: Uint8Array): Wallet[] {
  const wallets = []
  for (let i = 0; i < no_wallets; i++) {
    const pathTokens = DERIVATION_PATHS[chain].split("/");
    pathTokens[4] = i.toString()
    const path = pathTokens.join("/")

    const hd = HDKey.fromMasterSeed(seed)
    const child = hd.derive(path);

    if (!child.privateKey || !child.publicKey) {
      throw new Error("Failed to derive key");
    }

    if (chain === "solana") {
      const keypair = Keypair.fromSeed(seed.subarray(0, 32))
      wallets.push(createSolanaWallet(i + 1, bs58.encode(keypair.secretKey), keypair.publicKey.toBase58()))

    } else if (chain === "ethereum") {
      wallets.push(createEthereumWallet(i + 1, hexlify(child.privateKey), hexlify(child.publicKey)))
    }
  }
  return wallets
}

import { PublicKey } from "@solana/web3.js";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SOLANA_RPC_HOST_MAINNET_BETA: string
        GEMFARM_FARM_ID: PublicKey
      }
    }
  }
  export {};
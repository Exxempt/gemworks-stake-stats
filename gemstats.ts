import { initGemBank } from "./lib/gem-farm/common/gem-bank"
import { PublicKey } from "@solana/web3.js"
require('dotenv').config({ path: './.env' })

const solanaWeb3 =  require("@solana/web3.js");
const solana = new solanaWeb3.Connection(process.env.SOLANA_RPC_HOST_MAINNET_BETA);
const results: { wallet: string; mint: string }[] = [];

(async () => {
    try {
      const bankClient = await initGemBank(solana);
      const allVaults = await bankClient.fetchAllVaultPDAs(
        new PublicKey(process.env.GEMFARM_FARM_ID as unknown as PublicKey)
      );
      for (var Vault of allVaults) {
        if (Vault.account.gemBoxCount.toNumber() !== 0) {
          const foundGDRs = await bankClient.fetchAllGdrPDAs(Vault.publicKey);
          const owner = Vault.account.owner.toBase58();
          const mints = foundGDRs.map((gdr: any) => {
            return { mint: gdr.account.gemMint };
          });
          for (var mi of mints) {
            results.push({ wallet: owner, mint: mi.mint.toBase58() });
          }
          console.log(results)
        }
      }
    } catch (e) {
      console.log('error')
    }
  })();

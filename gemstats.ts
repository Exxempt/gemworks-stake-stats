import { initGemBank } from "./lib/gem-farm/common/gem-bank"
import { PublicKey } from "@solana/web3.js"

const {clusterApiUrl, Connection} = require("@solana/web3.js");
let connection = new Connection(clusterApiUrl('mainnet-beta'));
const solanaWeb3 =  require("@solana/web3.js");
const Solana = new solanaWeb3.Connection("https://long-empty-moon.solana-mainnet.quiknode.pro/69b0097f09a2712daaf427aec6f45f9e42e1702d/");

(async () => {
    try {
      const bankClient = await initGemBank(Solana);
      const allVaults = await bankClient.fetchAllVaultPDAs(
        new PublicKey("i7Z46YuSiej4LMYRHvhffH5MmuteuHUjFaVVqVfG5TP")
      );
      for (var Vault of allVaults) {
        if (Vault.account.gemBoxCount.toNumber() !== 0) {
          const foundGDRs = await bankClient.fetchAllGdrPDAs(Vault.publicKey);
          console.log(Vault.account.owner.toBase58());
          const mints = foundGDRs.map((gdr: any) => {
            return { mint: gdr.account.gemMint };
          });
          console.log("mints");
          for (var mi of mints) {
            console.log(mi.mint.toBase58());
          }
        }
      }
    } catch (e) {
      // Deal with it later
    }
  })();

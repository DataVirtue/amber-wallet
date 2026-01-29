import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import type { LayoutOutletContext } from "./Layout"
import { useOutletContext, Navigate } from 'react-router-dom'
import SeedPhraseTable from "./SeedPhraseTable"
import CopyToClipboardButton from "./CopyToClipboardButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from 'react'
import { mnemonicToSeedSync } from "@scure/bip39"
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button"
import type { Wallet } from "@/lib/wallet"
import { generateWallets } from "@/lib/wallet.ts"
import WalletListDisplay from "./WalletListDisplay"



export default function Wallets() {

  const { seedPhrase } = useOutletContext<LayoutOutletContext>()

  if (!seedPhrase) {
    return <Navigate to="/" replace />;
  }

  const [noSolWallets, setNoSolWallets] = useState(1)
  const [noEthWallets, setNoEthWallets] = useState(1)
  const [wallets, setWallets] = useState<Wallet[]>([])
  useEffect(() => {
    const seed = mnemonicToSeedSync(seedPhrase);
    async function addNewWallets() {
      const generatedSolWallets = generateWallets("solana", noSolWallets, seed);
      const generatedEthWallets = generateWallets("ethereum", noEthWallets, seed);
      const generatedWallets = [...generatedEthWallets, ...generatedSolWallets]
      for (const wallet of generatedWallets) {
        wallet.currentBalance = await wallet.getBalance();
      }
      setWallets(() => [...generatedWallets])

    }
    addNewWallets();


  }, [seedPhrase, noSolWallets, noEthWallets])


  return (
    <>
      <section className="border p- m-4 rounded-xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-4xl">Your Seed Phrase</AccordionTrigger>
            <AccordionContent>
              <SeedPhraseTable seedPhrase={seedPhrase} tableLabelText="List of your Seed Phrases" />
              <CopyToClipboardButton copyString={seedPhrase} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="m-5">
        <Tabs defaultValue="solana">
          <TabsList>
            <TabsTrigger value="solana">Solana</TabsTrigger>
            <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
          </TabsList>
          <TabsContent value="solana">
            {
              ...wallets.map(wallet => (
                wallet.chain == 'solana' &&
                <WalletListDisplay wallet={wallet} />
              ))}
            <div className="flex justify-center">
              <Button
                onClick={() => setNoSolWallets((prev) => prev + 1)}
                variant="secondary"
                className="my-auto cursor-pointer"

              ><Plus /> Add Walllet</Button>
            </div>

          </TabsContent>

          <TabsContent value="ethereum">

            {
              ...wallets.map(wallet => (
                wallet.chain == 'ethereum' &&
                <WalletListDisplay wallet={wallet} />
              ))}
            <div className="flex justify-center">
              <Button
                onClick={() => setNoEthWallets((prev) => prev + 1)}
                variant="secondary"
                className="my-auto cursor-pointer"

              ><Plus /> Add Walllet</Button>
            </div>

          </TabsContent>
        </Tabs>

      </section>
    </>

  )
}

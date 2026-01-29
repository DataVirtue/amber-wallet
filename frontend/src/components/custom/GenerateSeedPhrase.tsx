
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from '@scure/bip39/wordlists/english.js';
import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import type { LayoutOutletContext } from "./Layout"

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import CopyToClipboardButton from "./CopyToClipboardButton";
import SeedPhraseTable from "./SeedPhraseTable";

export default function GenerateSeedPhrase() {
  const { seedPhrase, setSeedPhrase } = useOutletContext<LayoutOutletContext>()
  const seedWords = seedPhrase.split(" ")


  useEffect(() => {
    async function createMneemonic() {
      if (!seedPhrase) {
        const mnemonic = generateMnemonic(wordlist);
        setSeedPhrase(mnemonic)
      }
    }
    createMneemonic();
  }, [seedPhrase])

  // list with words divided into rows
  const WORDS_PER_ROW = 3
  const splitList: string[][] = [[], [], [], []]
  seedWords.map((word, index) => {
    splitList[index % (WORDS_PER_ROW + 1)].push(word)
  })
  return (
    <section className="min-h-full grid place-items-center">
      <div className="min-w-md border p-4 rounded-xl">
        <SeedPhraseTable seedPhrase={seedPhrase} tableLabelText="List of your seed phrases, Copy and keep them safe" />
        <div className="flex justify-center mt-3 gap-5">
          <CopyToClipboardButton copyString={seedPhrase} />
          <Link to="/wallet/view">
            <Button className="cursor-pointer">Continue</Button>
          </Link>
        </div>
      </div>
    </section>

  )
}

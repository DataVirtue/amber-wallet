

import { Button } from '@/components/ui/button'
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import type { LayoutOutletContext } from './Layout'
import { Link, Navigate, useOutletContext } from "react-router-dom"


export default function SeedPhraseSelection() {

  const { seedPhrase } = useOutletContext<LayoutOutletContext>()
  if (seedPhrase) {
    return <Navigate to="/wallets" replace />
  }

  return (


    <section className="min-h-full grid place-items-center">
      <div className="m-auto flex w-full max-w-md flex-col gap-6">
        <h1 className="text-4xl">Welcome to Amber Wallet</h1>
        <h2 className="text-2xl text-center">Lets get you up and running</h2>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Generate New Seed Phrase</ItemTitle>
            <ItemDescription>
              This will be your secret for generating wallets
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Link to="/seed/generate">
              <Button className="cursor-pointer" size="sm">
                Generate
              </Button>
            </Link>
          </ItemActions>
        </Item>
        <Item variant="outline" size="sm" asChild>
          <Link to="/seed/add">
            <ItemMedia>
              <BadgeCheckIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Use Existing seed phrase </ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </div>
    </section>

  )
}

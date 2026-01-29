import type { Wallet } from "@/lib/wallet"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { copyFunctionWithToast } from "./CopyToClipboardButton"

interface WalletListDisplayProps {
  wallet: Wallet
}

export default function WalletListDisplay(props: WalletListDisplayProps) {
  const { wallet } = props
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  function truncateString(keyStr: string) {
    return keyStr.slice(0, 10) + "......." + keyStr.slice(keyStr.length - 10)
  }
  return (

    <Card className=" w-full my-5">
      <CardHeader>
        <CardTitle>
          <p className="mb-3">Wallet {wallet.srno}</p>
        </CardTitle>

        <p
          className="cursor-pointer"
          onClick={() => copyFunctionWithToast(wallet.publicKey || "")}
        >Public Key: {wallet.publicKey && truncateString(wallet.publicKey)}</p>
        <CardDescription>

          <p
            className="cursor-pointer"
            onClick={() => copyFunctionWithToast(wallet.privateKey || "")}
          >Private Key:
            {wallet.privateKey && showPrivateKey ? wallet.privateKey : "*".repeat(wallet.privateKey ? wallet.privateKey.length : 1)} </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The card component supports a size prop that can be set to
          &quot;sm&quot; for a more compact appearance.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}

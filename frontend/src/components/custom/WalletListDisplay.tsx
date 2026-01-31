import { Button } from "@/components/ui/button"
import { useState } from "react"
import { copyFunctionWithToast } from "./CopyToClipboardButton"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import type { Wallet } from "@/lib/wallet"
import WalletTransactionModal from "./WalletTransactionModal"




interface WalletListDisplayProps {
  wallet: Wallet
  selected: boolean
  setSelected: () => void // should set the selected wallet in parent component
  unSetSelected: () => void // should unset the selected wallet in parent component
}

export default function WalletListDisplay(props: WalletListDisplayProps) {
  const { wallet, selected, setSelected, unSetSelected } = props
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  function truncateString(keyStr: string) {
    return keyStr.slice(0, 10) + "......." + keyStr.slice(keyStr.length - 10)
  }
  return (

    <div className=" max-w-2xl my-5 border rounded-lg border-collapse">

      <div className="border-bottom rounded-md p-3">
        <p className=" mb-0 text-2xl">Wallet {wallet.srno}</p>
      </div>
      <div className="bg-card p-3">
        <p
          className="cursor-pointer text-lg mb-3 text-foreground"
          onClick={() => copyFunctionWithToast(wallet.publicKey || "")}
        >Public Key: {wallet.publicKey && truncateString(wallet.publicKey)}</p>
        <div className="flex gap-2 ">
          <p
            className="cursor-pointer inline text-md  text-muted-foreground pb-4"
            onClick={() => copyFunctionWithToast(wallet.privateKey || "")}
          >Private Key:
            {wallet.privateKey && showPrivateKey ? wallet.privateKey : "*".repeat(wallet.privateKey ? wallet.privateKey.length : 1)}
          </p>

          <span >
            {showPrivateKey ?
              <EyeIcon onClick={() => setShowPrivateKey(prev => !prev)} /> :
              <EyeOffIcon onClick={() => setShowPrivateKey(prev => !prev)} />}
          </span>
        </div>

        <Button
          onClick={setSelected}
          variant="outline" size="sm" className="w-full cursor-pointer border
          border-primary ">
          Select</Button>
      </div>
      {selected &&
        <WalletTransactionModal wallet={wallet} unSetSelected={unSetSelected} />
      }

    </div>

  )
}

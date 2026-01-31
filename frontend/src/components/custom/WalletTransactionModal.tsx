import { ArrowUpToLine, ArrowDownToLine, ArrowRightLeft } from "lucide-react"
import ReceiveQrModal from "./RecieveQrModal"
import SendCryptoModal from "./SendModal"
import type { Wallet } from "@/lib/wallet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Badge } from "@/components/ui/badge";
import solanalogo from "@/assets/solana-sol-logo.svg"
import etherumLogo from "@/assets/ethereum-eth-logo.svg"


type WalletAction = "send" | "receive" | "swap" | null
interface WalletTransactionModalProps {
    wallet: Wallet,
    unSetSelected: () => void // should unset the selected wallet in parent component
}

export default function WalletTransactionModal(props: WalletTransactionModalProps) {
    const { wallet, unSetSelected } = props;
    const [walletAction, setWalletAction] = useState<WalletAction>(null)
    const walletAddress = wallet.publicKey || "";
    const truncatedAddress = walletAddress.slice(0, 4) + "...." + walletAddress.slice(walletAddress.length - 4);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal content */}
            <div className="relative bg-card p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-3">
                <div className="mb-10 flex justify-center items-center gap-2">
                    <h1 className="text-2xl text-center">Wallet 1</h1>
                    {wallet.chain == 'solana' ? <img src={solanalogo} className="h-6 w-6 inline mt-0" />
                        : wallet.chain == 'ethereum' ? <img src={etherumLogo} className="h-6 w-6 inline mt-0" /> : null
                    }                </div>
                <div className="flex flex-col items-center">
                    <Badge variant="outline" className="text-sm rounded-sm font-thin">{truncatedAddress}</Badge>
                </div>

                <div className="text-center my-5">
                    <span className="text-3xl">{wallet.currentBalance?.toFixed(4)}
                        {wallet.chain == 'solana' ? " SOL" : wallet.chain == 'ethereum' ? " ETH" : ""}
                    </span>
                </div>
                <div className={"flex justify-center gap-5 text-primary pb-5 " + (walletAction ? "border-b-2" : "")}>
                    <div className="flex flex-col">
                        <Button onClick={() => setWalletAction("send")}
                            size="icon-lg" variant="outline" className="rounded-full mb-1 cursor-pointer hover:translate-y-px"><ArrowUpToLine /></Button>
                        <span className="block text-center text-sm">
                            Send
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Button onClick={() => setWalletAction("receive")}
                            size="icon-lg" variant="outline" className="rounded-full mb-1 cursor-pointer hover:translate-y-px"><ArrowDownToLine /></Button>
                        <span className="block text-center text-sm">
                            Receive
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Button size="icon-lg" variant="outline" className="rounded-full mb-1 cursor-pointer hover:translate-y-px"><ArrowRightLeft /></Button>
                        <span className="block text-center text-sm">
                            Swap
                        </span>
                    </div>
                </div>
                {walletAction === "send" &&
                    <SendCryptoModal wallet={wallet} setWalletAction={setWalletAction} />
                }{
                    walletAction === "receive" &&
                    <ReceiveQrModal walletAddress={wallet.publicKey || ""} setWalletAction={setWalletAction} chain={wallet.chain} />
                }
                <Button className="cursor-pointer mt-5 w-full" variant="outline" onClick={() => unSetSelected()}>
                    Close
                </Button>
            </div>
        </div>
    )
}
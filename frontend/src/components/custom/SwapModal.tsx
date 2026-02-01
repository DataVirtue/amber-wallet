
import { Button } from "@/components/ui/button"
import type { Wallet } from "@/lib/wallet";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import solanalogo from "@/assets/solana-sol-logo.svg"
import etherumLogo from "@/assets/ethereum-eth-logo.svg"
import { ArrowUpDown } from "lucide-react";

interface SwapModalProps {
    wallet: Wallet,
    setWalletAction: (action: null) => void
}

export default function SwapModal(props: SwapModalProps) {
    const { wallet, setWalletAction } = props;
    const walletAddress = wallet.publicKey || "";
    const truncatedAddress = walletAddress.slice(0, 4) + "...." + walletAddress.slice(walletAddress.length - 4);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal content */}
            <div className="relative bg-card p-6 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-center items-center gap-3 mb-5">
                    <h1 className="text-2xl text-center ">Swap</h1>
                </div>

                <div className="flex flex-col items-center mb-10">
                    <Badge variant="outline" className="text-sm rounded-sm font-thin">{truncatedAddress}</Badge>
                </div>
                <div className="relative">
                    <div className="flex flex-col max-w-md gap-5 justify-center border p-7 rounded-lg bg-background mb-1">
                        <div className="flex justify-between">
                            <p>Sell</p>
                            <p className="text-muted-foreground">Balance: {wallet.currentBalance?.toFixed(4)}
                                {wallet.chain === "solana" ? " SOL" : wallet.chain === "ethereum" ? " ETH" : ""} </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Input className="border-none" type="number" id="amount-to-sell" placeholder="0" />
                            <Badge variant="outline" className="text-lg rounded-sm font-thin">
                                <img src={wallet.chain == 'solana' ? solanalogo : wallet.chain == 'ethereum' ? etherumLogo : ""} className="h-4 w-4 inline mr-1" />
                                {wallet.chain === "solana" ? "SOL" : wallet.chain === "ethereum" ? "ETH" : ""}
                            </Badge>
                        </div>
                    </div>
                    <ArrowUpDown className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          w-10 h-10 p-2
                          text-primary bg-card
                          border rounded-full shadow-md z-10" />

                    <div className="flex flex-col max-w-md gap-5 justify-center mb-5 border p-7 rounded-lg bg-background">
                        <div className="flex justify-between">
                            <p>Buy</p>
                            <p className="text-muted-foreground">
                                Balance: {wallet.currentBalance?.toFixed(4)} {wallet.chain === "solana" ? " ETH" : wallet.chain === "ethereum" ? " SOL" : ""} </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Input className="border-none" type="number" id="amount-to-sell" placeholder="0" />
                            <Badge variant="outline" className="text-lg rounded-sm font-thin">
                                <img src={wallet.chain == 'solana' ? etherumLogo : wallet.chain == 'ethereum' ? solanalogo : ""} className="h-4 w-4 inline mr-1" />
                                {wallet.chain === "solana" ? "ETH" : wallet.chain === "ethereum" ? "SOL" : ""}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-2">
                    <Button className="cursor-pointer flex-1" variant="secondary" >
                        Confirm
                    </Button>
                    <Button className="cursor-pointer flex-1" variant="destructive" onClick={() => setWalletAction(null)}>
                        Cancel
                    </Button>
                </div>
            </div>

        </div>
    )
}
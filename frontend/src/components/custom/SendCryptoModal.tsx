
import { Button } from "@/components/ui/button"
import type { Wallet } from "@/lib/wallet";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import solanalogo from "@/assets/solana-sol-logo.svg"
import etherumLogo from "@/assets/ethereum-eth-logo.svg"

interface SendCryptoModalProps {
    wallet: Wallet,
    setWalletAction: (action: null) => void
}

export default function SendCryptoModal(props: SendCryptoModalProps) {
    const { wallet, setWalletAction } = props;
    const walletAddress = wallet.publicKey || "";
    const truncatedAddress = walletAddress.slice(0, 4) + "...." + walletAddress.slice(walletAddress.length - 4);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal content */}
            <div className="relative bg-card p-6 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-center items-center gap-2 mb-10">
                    <h1 className="text-2xl text-center">Send {wallet.chain == 'solana' ? " SOL" : wallet.chain == 'ethereum' ? " ETH" : ""}</h1>
                    {wallet.chain == 'solana' ? <img src={solanalogo} className="h-6 w-6 inline mt-0" />
                        : wallet.chain == 'ethereum' ? <img src={etherumLogo} className="h-6 w-6 inline mt-0" /> : null
                    }

                </div>
                <div className="max-w-md mx-auto flex flex-col gap-5 mt-5">
                    <div className="flex flex-col items-center">
                        <Badge variant="outline" className="text-sm rounded-sm font-thin">{truncatedAddress}</Badge>
                    </div>
                    <div className="text-center my-3">

                        <span className="text-3xl">{wallet.currentBalance?.toFixed(4)}
                            {wallet.chain == 'solana' ? " SOL" : wallet.chain == 'ethereum' ? " ETH" : ""}
                        </span>
                    </div>
                    <div className="flex flex-col max-w-md gap-3 justify-center">
                        <div className="text-foreground">
                            <label className="block mb-2 w-full text-center font-thin" htmlFor="amount">Amount</label>
                            <Input type="number" id="amount" />
                        </div>
                        <div className="text-foreground">
                            <label className="block mb-2 w-full text-center font-thin" htmlFor="target-wallet-public-key">Target Wallet Address:</label>
                            <Input id="target-wallet-public-key" />
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
        </div>
    )
}
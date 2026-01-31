import QRCode from "react-qr-code";
import CopyToClipboardButton from "./CopyToClipboardButton"
import { Button } from "@/components/ui/button"
import solanalogo from "@/assets/solana-sol-logo.svg"
import etherumLogo from "@/assets/ethereum-eth-logo.svg"

interface ReceiveQrModalProps {
    walletAddress: string
    setWalletAction: (action: null) => void
    chain: string
}

export default function ReceiveQrModal(props: ReceiveQrModalProps) {
    const { walletAddress, setWalletAction, chain } = props;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Modal content */}
            <div className="relative bg-card p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex flex-col justify-center items-center ">
                    <div className="flex justify-center items-center gap-2">
                        <h1 className="text-2xl text-center">Wallet 1</h1>
                        {chain == 'solana' ? <img src={solanalogo} className="h-6 w-6 inline mt-0" />
                            : chain == 'ethereum' ? <img src={etherumLogo} className="h-6 w-6 inline mt-0" /> : null
                        }
                    </div>
                    <div className="flex justify-center mt-5">
                        <QRCode
                            className="border bg-foreground p-2 rounded-md"
                            size={256}
                            style={{ height: "auto" }}
                            value={walletAddress || ""}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <p className="block text-center mt-2 text-sm text-foreground font-medium p-2 break-words max-w-sm"> {walletAddress}</p>
                    <p className="block text-center mt-2 text-md text-muted-foreground pb-3">Wallet Address QR Code</p>
                    <div className="flex gap-2">
                        <CopyToClipboardButton copyString={walletAddress || ""} />
                        <Button className="cursor-pointer flex-1" variant="default" onClick={() => setWalletAction(null)}>
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
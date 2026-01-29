
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import type { ReactNode } from "react";

interface CopyToClipboardButtonProps {
  copyString: string,
  children?: ReactNode
}

export function copyFunctionWithToast(copyString: string) {
  toast.promise(navigator.clipboard.writeText(copyString),
    {
      loading: "Loading...",
      success: "Copied to clipboard",
      error: "Error"
    }
  )
}

export default function CopyToClipboardButton(props: CopyToClipboardButtonProps) {
  return (
    <Button variant="secondary" className="cursor-pointer"
      onClick={() => { copyFunctionWithToast(props.copyString) }}>
      {props.children || <><Copy className="h-4 w-4" /> Copy to clipboard</>}
    </Button>
  )

}

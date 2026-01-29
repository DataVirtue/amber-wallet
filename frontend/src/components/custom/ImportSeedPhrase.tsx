import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "../ui/button"
import { useOutletContext } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import type { LayoutOutletContext } from "./Layout"
import { isValidSeedPhrase } from "@/lib/customUtils"

export default function ImportSeedPhrase() {
  const [visible, setVisible] = useState(false)
  const { seedPhrase, setSeedPhrase } = useOutletContext<LayoutOutletContext>()
  const [seedPhraseInputValue, setSeedPhraseInputValue] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  console.log(errorMsg)
  return (

    <section className="min-h-full grid place-items-center">
      <div>
        <h1 className="text-2xl mb-3">Enter Your Seed Phrase </h1>
        <div className="flex max-w-md gap-2">
          <div>
            <InputGroup

              className={errorMsg !== "" ?
                "border-destructive focus-visible:ring-destructive" : ""
              }
            >
              <InputGroupInput value={seedPhraseInputValue} onChange={(e) => {
                setSeedPhraseInputValue(e.target.value)
                const { isValid, reason } = isValidSeedPhrase(e.target.value);
                console.log(isValid, reason, "returned ..")
                setErrorMsg(reason)
                if (!isValid) {
                  return;
                }
                setSeedPhrase(e.target.value)
              }}
                placeholder="creek theory visa..." type={visible ? "text" : "password"}

              />

              <InputGroupButton onClick={() => setVisible((v) => !v)}>
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </InputGroupButton>
            </InputGroup>
            {
              errorMsg !== "" && <p className="ml-5 mt-2 text-sm text-destructive">{errorMsg}</p>}
          </div>

          <Button disabled={errorMsg !== "" || !seedPhrase}>

            <Link to="/wallet/view">
              Continue

            </Link>
          </Button>
        </div>

      </div>
    </section>


  )
}

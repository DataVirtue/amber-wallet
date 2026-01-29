
import { wordlist } from '@scure/bip39/wordlists/english.js';

export function isValidSeedPhrase(seedPhrase: string) {
  const seedWordList = seedPhrase.split(" ");
  if (seedWordList.length < 12) {
    return { isValid: false, reason: `Invalid length ${12} or incorrect spaces` }
  }
  let invalidWord = ""
  seedWordList.map((word) => {
    if (!wordlist.includes(word)) {
      console.log("not in word list")
      invalidWord = word
      return
    }
  })
  if (invalidWord) {
    return {
      isValid: false, reason: `Invalid word ${invalidWord}`
    }
  }
  return { isValid: true, reason: "" }
}





import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface SeedPhraseTableProps {
  seedPhrase: string,
  tableLabelText: string,
}

export default function SeedPhraseTable(props: SeedPhraseTableProps) {

  const seedWords = props.seedPhrase.split(" ")
  // list with words divided into rows
  const WORDS_PER_ROW = 3
  const splitList: string[][] = [[], [], [], []]
  seedWords.map((word, index) => {
    splitList[index % (WORDS_PER_ROW + 1)].push(word)
  })

  return (
    <Table className="border-separate border-spacing-y-2 border-spacing-x-2" >
      <TableCaption>{props.tableLabelText}</TableCaption>
      <TableBody className="blur-md hover:blur-none transition-all">
        {
          splitList.map((wordList, rowIndex) => (
            <TableRow key={rowIndex} >

              {wordList.map((word, index) => (
                <TableCell className="border rounded-xl" key={(rowIndex * WORDS_PER_ROW + index + 1)}>
                  {rowIndex * WORDS_PER_ROW + index + 1}. {word}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

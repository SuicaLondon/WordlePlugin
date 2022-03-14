import { wordItem } from "../types/cardType";
import { common } from "../data/words"

export default function wordFilter(wordGrid: wordItem[][]): string[] {
    let words = common
    console.log(wordGrid)
    for (let i = 0; i < wordGrid.length; i++) {
        const wordList = wordGrid[i]
        for (let j = 0; j < wordList.length; j++) {
            const wordObject = wordList[j]
            if (wordObject.character !== '') {
                console.log(words, wordObject)
                if (wordObject.color === "gray") {
                    words = words.filter(word => word.indexOf(wordObject.character) === -1)
                } else if (wordObject.color === 'yellow') {
                    words = words.filter(word => word.indexOf(wordObject.character) !== -1 && word.indexOf(wordObject.character) !== j)
                } else {
                    words = words.filter(word => word.indexOf(wordObject.character) === j)
                }
                console.log(words)
            }
        }
    }
    return words
}
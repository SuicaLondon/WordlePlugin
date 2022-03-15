import { WordItem } from "../types/cardType";
import { common } from "../data/words"

class WordFilter {
    words: string[] = []
    greens: string[] = []
    yellows: string[][] = []
    grays: string[] = []
    constructor() {
        console.log('init')
        this.initData()
    }

    initData() {
        const maxLength = 5
        this.words = [...common]
        this.grays = []
        this.yellows = Array(maxLength).fill(null).map(() => [])
        this.greens = Array(maxLength).fill(null)
    }

    setInputedWords(grid: WordItem[][]) {
        for (let i = 0; i < grid.length; i++) {
            const list = grid[i]
            for (let j = 0; j < list.length; j++) {
                const item = list[j]
                if (item.character !== '') {
                    this.insertWord(item.color, item.character, j)
                }
            }
        }
    }

    filterWords(): string[] {
        const yellowFlat = this.yellows.flat()
        console.log(this.yellows)
        console.log(yellowFlat) 
        return this.words.filter(word => {
            for (let i = 0; i < word.length; i++) {
                const character = word[i]
                if (this.grays.indexOf(character) !== -1) {
                    return false
                }
                if (this.greens[i] && this.greens[i] !== character) {
                    return false
                }
                if (yellowFlat.indexOf(character) !== -1 && this.yellows[i].indexOf(character) !== -1) {
                    console.log(`${word} has ${character} at ${i}: yellow`)
                    return false
                }
            }
            return true
        })
    }

    private insertWord(color: string, character: string, index: number) {
        switch (color) {
            case 'gray':
                this.insertGray(character)
                break
            case 'yellow':
                this.insertYellow(character, index)
                break
            default:
                this.insertGreen(character, index)
        }
    }

    private insertGray(character: string) {
        if (!this.grays.includes(character)) {
            this.grays.push(character)
        }
    }

    private insertYellow(character: string, index: number) {
        if (!this.yellows[index].includes(character)) {
            this.yellows[index].push(character)
        }
    }
    private insertGreen(character: string, index: number) {
        console.log(character, index)
        if (!this.greens[index]) {
            this.greens[index] = character
        }
    }
}

const wordFilter = new WordFilter()
export default wordFilter
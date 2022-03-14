import React, { useEffect, useState, MouseEvent } from 'react';
import './App.scss';
import InputRow from './components/inputRow/InputRow';
import { wordItem } from './types/cardType';
import wordFilter from './utils/wordFilter';

const maxLength = 5
const maxChance = 6
const initWordItem = { character: '', color: 'gray' } as wordItem
const inputId = "input"

function App() {
  const [words, setWords] = useState<string>('')
  const [row, setRow] = useState<number>(0)
  const [wordGrid, setWordGrid] = useState<wordItem[][]>(Array.from(Array(maxChance), () => Array(maxLength).fill({ ...initWordItem })))
  const [possibleWords, setPossibleWords] = useState<string[]>([])

  useEffect(() => {
    let wordList = wordGrid[row]
    wordList.splice(0, words.length, ...words.split('').map(word => { return { character: word, color: 'gray' } as wordItem }))
    const emptyCount = maxLength - words.length
    wordList.splice(words.length, emptyCount, ...Array(emptyCount).fill({ ...initWordItem }))
    wordGrid[row] = wordList
    setWordGrid([...wordGrid])
  }, [words])

  const onCardClickHandler = (e: MouseEvent<HTMLLabelElement>, rowIndex: number, columnIndex: number) => {
    e.stopPropagation()
    const wordList = wordGrid[rowIndex]
    if (wordList[columnIndex].character !== '') {
      if (wordList[columnIndex].color === 'gray') {
        wordList[columnIndex].color = 'yellow'
      } else if (wordList[columnIndex].color === 'yellow') {
        wordList[columnIndex].color = 'green'
      } else if (wordList[columnIndex].color === 'green') {
        wordList[columnIndex].color = 'gray'
      }
      wordGrid[rowIndex] = wordList
      setWordGrid([...wordGrid])
    }
  }

  useEffect(()=>{
    setWords('')
    setPossibleWords(wordFilter(wordGrid))
  }, [row])

  const onButtonPreviousClick = () => {
    if (row > 0) {
      setRow(row - 1)
    } else {
      setRow(maxChance - 1)
    }
  }

  const onButtonNextClick = () => {
    if (row < maxChance - 1) {
      setRow(row + 1)
    } else {
      setRow(0)
    }
  }

  return (
    <div className="App">
      {
        wordGrid.map((wordList, index) => {
          return (
            <div className={index === row ? 'current' : ''}>
              <InputRow inputId={inputId} wordList={wordList} rowIndex={index} onCardClickHandler={onCardClickHandler} />
            </div>
          )
        })
      }

      <div className="row">
        <button onClick={onButtonPreviousClick}>Previous</button>
        <input id={inputId} value={words} type="text" maxLength={maxLength} onChange={e => setWords(e.target.value.toLowerCase())} />
        <button onClick={onButtonNextClick}>Next</button>
      </div>

      <div className="words-list">
          {possibleWords.map(word=> {
            return(
              <div className='word-item'>{word}</div>
            )
          })}
        </div>
    </div>
  );
}

export default App;

import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import './inputRow.scss'

interface InputRowProps {
    rowNumber: string
}

interface wordItem {
    character: string
    color: 'gray' | 'yellow' | 'green'
}

const maxLength = 5
const initWordItem = { character: '', color: 'gray' } as wordItem

export default function InputRow({ rowNumber }: InputRowProps) {
    const [words, setWords] = useState<string>('')
    const [wordList, setWordList] = useState<wordItem[]>(Array(maxLength).fill({ ...initWordItem }))
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        wordList.splice(0, words.length, ...words.split('').map(word => { return { character: word, color: 'gray' } as wordItem }))
        const emptyCount = maxLength - words.length
        wordList.splice(words.length, emptyCount, ...Array(emptyCount).fill({ ...initWordItem }))
        setWordList([...wordList])
    }, [words])

    const onCardClickHandler = (e: MouseEvent<HTMLLabelElement>, index: number) => {
        e.stopPropagation()
        if (wordList[index].character !== '') {
            if (wordList[index].color === 'gray') {
                wordList[index].color = 'yellow'
            } else if (wordList[index].color === 'yellow') {
                wordList[index].color = 'green'
            }else if (wordList[index].color === 'green') {
                wordList[index].color = 'gray'
            }
            setWordList([...wordList])
        }
    }

    return (
        <div className="container">
            <input id={rowNumber} ref={inputRef} type="text" maxLength={maxLength} onChange={e => setWords(e.target.value)} />
            {
                wordList.map((item, index) => {
                    return (
                        <label className={`card ${item.color}`} key={index} htmlFor={rowNumber} onClick={(e) => onCardClickHandler(e, index)}>
                            {item.character}
                        </label>
                    )
                })
            }
        </div>
    )
}

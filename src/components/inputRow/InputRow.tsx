import React, { MouseEvent } from 'react'
import { WordItem } from '../../types/cardType'
import './inputRow.scss'

interface InputRowProps {
    inputId: string,
    wordList: WordItem[],
    rowIndex: number,
    onCardClickHandler: (e: MouseEvent<HTMLLabelElement>, rowIndex: number, columnIndex: number) => void
}

export default function InputRow({ inputId, wordList, rowIndex, onCardClickHandler }: InputRowProps) {
    return (
        <div className="container">
            {
                wordList.map((item, index) => {
                    return (
                        <label className={`card ${item.color}`} key={index} htmlFor={inputId} onClick={(e) => onCardClickHandler(e, rowIndex, index)}>
                            {item.character.toUpperCase()}
                        </label>
                    )
                })
            }
        </div>
    )
}

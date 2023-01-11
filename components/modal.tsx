import React, { useState } from 'react'
import styles from '../styles/Modal.module.scss'
import { Meme } from '../types/Types'
import { saveAs } from 'file-saver'

type ModalMeme = Pick<Meme, 'id' | 'name' | 'blank' | 'lines'>

type ModalProps = ModalMeme & {
    handleCloseModal: () => void
}

type Input = {
    [key: number]: string
}

export default function Modal({ id, name, blank, lines, handleCloseModal }: ModalProps) {
    const [text, setText] = useState<Input>({})
    const [isLoading, setIsLoading] = useState(false)
    const [newImage, setNewImage] = useState('')
    console.log("🚀 ~ file: modal.tsx:19 ~ Modal ~ newImage", newImage)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = e.target.attributes.getNamedItem('data-index')?.value

        if (currentInput) {
            setText((prevState) => ({
                ...prevState,
                [currentInput]: e.target.value
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)
        const layers = Object.values(text)
        let newImg = `https://api.memegen.link/images/${id}/`

        layers.forEach((value, i) => {
            const isLast = layers.length - 1 === i
            if (isLast) {
                newImg += encodeURIComponent(`${value}.png`)
                return
            }
            newImg += encodeURIComponent(`${value}/`)
        })

        setNewImage(newImg)
    }

    const handleImageLoaded = () => {
        setIsLoading(false)
    }

    const arrayOfLines = Array.from(Array(lines).keys())

    const downloadImage = () => {
        saveAs(newImage, 'myMeme.png')
    }


    return (
        <div className={styles.modal}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} >
                    {arrayOfLines.map((line, i) => (
                        <input key={line} type='text' placeholder='Add text' data-index={i} onChange={handleChange} title='Generate new text' />
                    ))}
                    <button className={styles.button} type='submit'>Generate</button>
                </form>

                {isLoading && (
                    <strong className={styles.strong} >Please wait...</strong>
                )}
                <img src={newImage || blank} alt={name} onLoad={handleImageLoaded} />
                <button className={styles.download} onClick={downloadImage} >Download</button>
                <button className={styles.close} onClick={handleCloseModal} >Close</button>

            </div>
        </div>
    )
}
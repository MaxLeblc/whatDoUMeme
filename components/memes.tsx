import { useEffect, useState } from 'react'
// import Image from 'next/image'  Cheh !
import styles from '../styles/Memes.module.scss'
import { Meme } from '../types/Types'
import Modal from '../components/modal'

type ModalState = Pick<Meme, 'id' | 'name' | 'blank' | 'lines'>

export default function Memes() {
    const [memes, setMemes] = useState<Meme[] | null>(null)
    const [query, setQuery] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [currentModal, setCurrentModal] = useState<ModalState>({
        id: '',
        name: '',
        blank: '',
        lines: 1,
    })

    useEffect(() => {
        fetch(`https://api.memegen.link/templates/`)
            .then(response => response.json())
            .then(data => {
                setMemes(data)
            })
    }, [])

    const handleOpenModal = ({ id, name, blank, lines }: ModalState) => {
        setCurrentModal({ id, name, blank, lines })
        setOpenModal(true)
        console.log('in modal', currentModal);
    }

    const handleCloseModal = () => {
        setCurrentModal({ id: '', name: '', blank: '', lines: 1 })
        setOpenModal(false)
    }

    // onClick={(e)=> e.stopPropagation()}

    return (
        <div className={styles.container} >
            <div className={styles.gradiantInput} >
                <input type="text" placeholder='Search a meme...' onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className={styles.memes}>
                {openModal && currentModal.id && (
                    <Modal id={currentModal.id} name={currentModal.name} blank={currentModal.blank} lines={currentModal.lines} handleCloseModal={handleCloseModal} />
                )}
                {memes?.filter((value) => {
                    if (query === '') {
                        return value
                    } else if (value.name.toLowerCase().includes(query.toLowerCase())) {
                        return value
                    }
                }).map((meme) => (
                    <div key={meme.id} className={styles.cards} onClick={() => handleOpenModal({ id: meme.id, name: meme.name, blank: meme.blank, lines: meme.lines })}>
                        <img src={meme.blank} alt={meme.name} />
                        <div className={styles.description} >
                            <p>{meme.name}</p>
                            <button className={styles.button} type='button' onClick={() => handleOpenModal({ id: meme.id, name: meme.name, blank: meme.blank, lines: meme.lines })} >Generate</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
import { useEffect, useState } from 'react'
import styles from '../styles/ToTop.module.scss'
import Image from 'next/image'

export default function ToTop() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        document.documentElement.scrollTop > 500 ? setVisible(true) : setVisible(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible)
    }, []) 

    return (
            <>
            <Image src='/icons/toTop.png' alt='icon' width={16} height={16} className={styles.toTop}  style={{display: visible ? 'inline' : 'none'}} onClick={scrollToTop}/>
            </>
    )
}
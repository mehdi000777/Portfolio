import React from 'react'
import { BsTelegram, BsWhatsapp } from 'react-icons/bs'

const socialMedia = () => {
    return (
        <div className='app__social'>
            <div>
                <BsTelegram />
            </div>
            <div>
                <BsWhatsapp />
            </div>
        </div>
    )
}

export default socialMedia
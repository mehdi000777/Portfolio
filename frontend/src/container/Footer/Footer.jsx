import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import "./Footer.scss"
import { client } from '../../client'

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formSubmited, setFormSubmited] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: "contact",
      name,
      email,
      message
    }

    client.create(contact).then(() => {
      setLoading(false)
      setFormSubmited(true)
    })

  }

  return (
    <>
      <h2 className='head-text'>Take A Coffe & Chat With Me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:mehdi000077777@gmail.com" className='p-text'>mehdi000077777@gmail.com</a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +98 (9389823019)" className='p-text'>+98 (9389823019)</a>
        </div>

        {!formSubmited ?
          < div className='app__footer-form app__flex'>
            <div className='app__flex'>
              <input type="text" className='p-text' placeholder='Your Name' name='name' value={name}
                onChange={handleChange} />
            </div>

            <div className='app__flex'>
              <input type="email" className='p-text' placeholder='Your Email' name='email' value={email}
                onChange={handleChange} />
            </div>

            <div>
              <textarea className='p-text' placeholder='Your Message' name='message' value={message}
                onChange={handleChange} />
            </div>

            <button type='submit' className='p-text' onClick={handleSubmit}>{loading ? "Sending" : "Send Messsage"}</button>
          </div>
          :
          <div>
            <h3 className='head-text'>Thank you for getting in touch</h3>
          </div>
        }
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact", "app__whitebg")
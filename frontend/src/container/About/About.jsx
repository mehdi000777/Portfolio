import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import "./About.scss"
import { urlFor, client } from '../../client'
import { AppWrap } from '../../wrapper'


const About = () => {
  const [abouts, setAbouts] = useState([])

  useEffect(() => {
    const qury = '*[_type == "abouts"]';

    client.fetch(qury).then(data => setAbouts(data))
  }, [])

  return (
    <>
      <h2 className='head-text' style={{ marginTop: "2rem" }}>
        I Know that<span> Good Apps</span><br />means<span> Good Business</span>
      </h2>

      <div className="app__profiles">
        {
          abouts.map(item => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: .5, type: "tween" }}
              key={item}
              className="app__profile-item"
            >
              <img src={urlFor(item.imgUrl)} alt={item.title} />
              <h2 className='bold-text' style={{ marginTop: 20 }}>{item.title}</h2>
              <p className='p-text' style={{ marginTop: 10 }}>{item.description}</p>
            </motion.div>
          ))
        }
      </div>
    </>
  )
}

export default AppWrap(About, "about")
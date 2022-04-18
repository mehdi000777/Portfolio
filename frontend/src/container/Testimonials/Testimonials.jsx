import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import "./Testimonials.scss"

const Testimonials = () => {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const query = "*[_type == 'testimonials']"
    const brandsQuery = "*[_type == 'brands']"

    client.fetch(query).then(data => {
      setTestimonials(data)
    })

    client.fetch(brandsQuery).then(data => {
      setBrands(data)
    })
  }, [])

  const handleClick = (index) => {
    setCurrentIndex(index)
  }

  const test = testimonials[currentIndex]

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonials-item app__flex">
            <img src={urlFor(test.imgurl)} alt="testimonial" />
            <div className='app__testimonials-content'>
              <p className='p-text'>{test.feedback}</p>
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>
            </div>
          </div>

          <div className='app__testimonial-btns app__flex'>
            <div className="app__flex"
              onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex"
              onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}


      <div className='app__testimonial-brands app__flex'>
        {brands.map((item, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: .5, type: "tween" }}
          >
            <img src={urlFor(item.imgUrl)} alt={item.name} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Testimonials, "app__testimonials"), "testimonials", "app__graybg")
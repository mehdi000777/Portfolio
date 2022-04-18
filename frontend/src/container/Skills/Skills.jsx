import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactTooltip from 'react-tooltip'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import "./Skills.scss"

const Skills = () => {
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client.fetch(query).then(data => {
      setExperiences(data)
    })

    client.fetch(skillsQuery).then(data => {
      setSkills(data)
    })
  }, [])

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((item, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: .5 }}
              className="app__skills-item app__flex"
            >
              <div className="app__flex" style={{ backgroundColor: item.bgColor }}>
                <img src={urlFor(item.icon)} alt={item.name} />
              </div>
              <p className="p-text">{item.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-exp">
          {experiences.map((item, index) => (
            <motion.div key={index} className="app__skills-exp-item">
              <div className="app__skills-exp-year">
                <p className='p-text'>{item.year}</p>
              </div>

              <motion.div className="app__skills-exp-works">
                {item.works.map((work, indexWork) => (
                  <>
                    <motion.div
                      key={indexWork}
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: .5 }}
                      data-tip
                      data-for={work.name}
                      className="app__skills-exp-work"
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="sills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills","app__whitebg")
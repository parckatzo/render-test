import React from 'react'
import { Course } from './Course'

const Course1 = (props) => {
  return (
    <div>
        <Course course ={props.course[0]}/>
        <Course course ={props.course[1]}/>
    </div>
  )
}

export default Course1
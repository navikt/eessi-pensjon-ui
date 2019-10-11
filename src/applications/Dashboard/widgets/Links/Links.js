import React from 'react'
import { Link } from 'react-router-dom'
import * as Nav from '../../../../Nav'

export const Links = () => (
  <div className='w-links'>
    <Nav.Lenkepanel
      border
      className='frontPageLink bucLink'
      linkCreator={(props) => (
        <Link to='//google.com' {...props} />)} href='#'
    >
      {'Google'}
    </Nav.Lenkepanel>
  </div>
)

Links.propTypes = {}

export default Links

import * as Nav from 'Nav'
import React from 'react'
import { Link } from 'react-router-dom'

export const Links = (): JSX.Element => (
  <div className='w-links'>
    <Nav.Lenkepanel
      tittelProps=''
      border
      className='frontPageLink bucLink'
      linkCreator={(props: any) => (
        <Link to='//google.com' {...props} />)} href='#'
    >
      Google
    </Nav.Lenkepanel>
  </div>
)

export default Links

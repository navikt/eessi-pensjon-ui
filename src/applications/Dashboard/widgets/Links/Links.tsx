import * as Nav from 'Nav'
import React from 'react'
import { Link } from 'react-router-dom'

export const Links: React.FC = (): JSX.Element => (
  <div className='w-links'>
    <Nav.Lenkepanel
      tittelProps=''
      border
      className='frontPageLink bucLink'
      linkCreator={(props: any) => (
        <Link to='//nav.no' {...props} />)} href='#'
    >
      Nav
    </Nav.Lenkepanel>
  </div>
)

export default Links

import React from 'react'

const NavPensjonTristOrangeVeileder = (props: any) => (
  <img
    width={(props.width || props.size || 220)}
    alt='nav-trist-veileder'
    height={(props.height || props.size || 220)}
    src={require('./navPensjonTristOrangeVeileder.png')}
  />
)

export default NavPensjonTristOrangeVeileder

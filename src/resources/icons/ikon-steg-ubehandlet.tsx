import React from 'react'
export default (props: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' {...props}>
    <g fill='none' fillRule='evenodd'>
      <circle cx='14' cy='14' r='13' stroke={props.color || '#B7B1A9'} stroke-width='2' />
      <circle cx='14' cy='14' r='1.826' fill={props.color || '#B7B1A9'} />
      <circle cx='21.304' cy='14' r='1.826' fill={props.color || '#B7B1A9'} />
      <circle cx='6.696' cy='14' r='1.826' fill={props.color || '#B7B1A9'} />
    </g>
  </svg>
)

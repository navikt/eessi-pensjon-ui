import React from 'react'
export default (props: any) => (
  <svg {...props} viewBox='0 0 23 23' xmlns='http://www.w3.org/2000/svg'>
    <title>Advarsel</title>
    <g stroke={props.color || '#BA3A26'} fill='none' fillRule='evenodd' strokeLinejoin='round'>
      <path d='M11.5 15.805V8.154M22.5 22.5H.5l11-22z' strokeLinecap='round' />
      <path d='M12 19a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
    </g>
  </svg>
)

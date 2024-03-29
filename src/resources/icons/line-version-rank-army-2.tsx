import React from 'react'
export default (props: any) => (
  <svg
    contentScriptType='text/ecmascript'
    zoomAndPan='magnify'
    contentStyleType='text/css' viewBox='0 0 24 24'
    preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g
      fill='none' strokeMiterlimit='10' stroke={props.color || '#3e3832'}
      strokeLinejoin='round' strokeLinecap='round'
    >
      <path d='M20.5 22.5l-8.5-5-8.5 5v-3l8.5-5 8.5 5zM20.5 16l-8.5-5-8.5 5v-3l8.5-5 8.5 5zM20.5 9.5l-8.5-5-8.5 5v-3l8.5-5 8.5 5z' />
    </g>
  </svg>
)

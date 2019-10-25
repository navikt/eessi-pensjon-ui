import React from 'react'
export default (props) => (
  <svg
    contentScriptType='text/ecmascript'
    zoomAndPan='magnify'
    id='Layer_1' version='1.1'
    preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
    width={props.w} height={props.h}
  >
    <g fill='green'>
      <path fill='none' d='M17,8.5l-7.5,7L7,13' stroke='green' />
      <circle fill='none' r='11.5' cx='12' cy='12' stroke='green' />
    </g>
  </svg>
)

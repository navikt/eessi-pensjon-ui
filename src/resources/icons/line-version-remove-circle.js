import React from 'react'
export default (props) => (
  <svg
    contentScriptType='text/ecmascript' zoomAndPan='magnify'
    contentStyleType='text/css'
    id='Layer_1' version='1.1'
    preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 23 23' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
    width={props.width} height={props.height}
    className={props.className} onClick={props.onClick}
  >
    <g fill='red'>
      <circle fill='none' r='11' cx='11.5' cy='11.5' stroke='red' />
      <path
        fill='none' d='M15.7,7.3l-8.5,8.5 M15.7,15.7L7.3,7.3'
        stroke='red'
      />
    </g>
  </svg>
)

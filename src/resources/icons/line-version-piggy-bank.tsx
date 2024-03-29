import React from 'react'
export default (props: any) => (
  <svg
    contentScriptType='text/ecmascript' width='24'
    zoomAndPan='magnify'
    contentStyleType='text/css' viewBox='0 0 24 24' height='24'
    preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg'
    version='1.0' {...props}
  >
    <g
      fill='none' strokeMiterlimit='10' stroke={props.color || '#3e3832'}
      strokeLinejoin='round' strokeLinecap='round'
    >
      <path d='M11.513 7.518c1.78-.119 3.549.393 5 1.482M23.513 11c0 1.104-.896 2-2 2' />
      <path d='M12.013 5c-.85 0-1.67.104-2.454.281-.601-1.063-1.739-1.781-3.046-1.781-.638 0-1.234.175-1.75.472.91.526 1.562 1.451 1.715 2.537-2.095 1.267-3.555 3.231-3.891 5.491h-2.074v4h2.697c1.41 2.931 4.817 5 8.803 5 5.247 0 9.5-3.581 9.5-8 0-4.417-4.253-8-9.5-8z' />
      <circle r='.5' cx='6.013' cy='11.5' />
      <path d='M7.513 20.266v3.234M16.513 20.234v3.266' />
    </g>
  </svg>
)

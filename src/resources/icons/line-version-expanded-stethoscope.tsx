import React from 'react'
export default (props: any) => (
  <svg
    contentScriptType='text/ecmascript' zoomAndPan='magnify'
    contentStyleType='text/css'
    id='Outline_Version' enableBackground='new 0 0 24 24' version='1.1'
    width='24px' preserveAspectRatio='xMidYMid meet'
    viewBox='0 0 24 24' height='24px' xmlns='http://www.w3.org/2000/svg'
    x='0px' y='0px' {...props}
  >
    <path
      fill={props.color || '#3e3832'}
      d='M22,10.5C22,9.122,20.879,8,19.5,8S17,9.122,17,10.5c0,1.207,0.86,2.217,2,2.449V19.5c0,0.827-0.673,1.5-1.5,1.5  S16,20.327,16,19.5v-2.999c0-1.655-1.346-3.001-3-3.001s-3,1.346-3,3v5c0,0.827-0.673,1.5-1.5,1.5S7,22.327,7,21.5v-7.025  c2.799-0.254,5-2.611,5-5.475V4c0-1.207-0.86-2.217-2-2.449V0.5C10,0.224,9.776,0,9.5,0c-0.804,0-2,0.533-2,2s1.196,2,2,2  C9.776,4,10,3.776,10,3.5V2.592C10.581,2.799,11,3.349,11,4v5c0,2.481-2.019,4.5-4.5,4.5S2,11.481,2,9V4  c0-0.651,0.419-1.201,1-1.408V3.5C3,3.776,3.224,4,3.5,4c0.804,0,2-0.533,2-2s-1.196-2-2-2C3.224,0,3,0.224,3,0.5v1.051  C1.86,1.783,1,2.793,1,4v5c0,2.864,2.201,5.221,5,5.475V21.5C6,22.878,7.121,24,8.5,24s2.5-1.122,2.5-2.5v-5c0-1.103,0.897-2,2-2  s2,0.897,2,2.001V19.5c0,1.378,1.121,2.5,2.5,2.5s2.5-1.122,2.5-2.5v-6.551C21.14,12.717,22,11.707,22,10.5z M9,2.89  C8.748,2.77,8.5,2.519,8.5,2c0-0.516,0.245-0.767,0.5-0.888V2.89z M4,1.11C4.252,1.23,4.5,1.481,4.5,2  c0,0.515-0.244,0.766-0.5,0.888V1.11z M19.5,12c-0.827,0-1.5-0.673-1.5-1.5S18.673,9,19.5,9S21,9.673,21,10.5S20.327,12,19.5,12z'
    />
  </svg>
)
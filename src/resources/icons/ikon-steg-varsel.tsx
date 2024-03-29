import React from 'react'
export default (props: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' {...props}>
    <g fill='none' fillRule='evenodd'>
      <path fill={props.color || '#FFB249'} fillRule='nonzero' d='M16.273-.006l-.285.003C11.703.072 7.669 1.805 4.632 4.875 1.572 7.968-.071 12.017.002 16.277c.154 8.817 7.062 15.724 15.727 15.724l.283-.003c8.968-.154 16.14-7.459 15.986-16.279C31.845 6.902 24.937-.006 16.273-.006z' />
      <path fill={props.color || '#3E3832'} d='M15.304 8.342a.696.696 0 0 1 1.392 0v9.74a.697.697 0 0 1-1.392 0v-9.74zM16.025 24.342H16a1.39 1.39 0 0 1-.025-2.781L16 21.56a1.392 1.392 0 0 1 .025 2.782z' />
    </g>
  </svg>
)

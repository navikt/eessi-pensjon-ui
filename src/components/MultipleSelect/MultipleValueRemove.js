import React from 'react'
import Icons from '../Icons/Icons'
import { components } from 'react-select'

const MultipleValueRemove = (props) => (
  <components.MultiValueRemove {...props} className='c-multipleSelect-multipleValueRemove'>
    <Icons kind='close' />
  </components.MultiValueRemove>
)

MultipleValueRemove.displayName = 'MultipleValueRemove'
export default MultipleValueRemove

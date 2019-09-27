import React from 'react'
import Icons from '../Icons/Icons'
import { components } from 'react-select'
import MultipleOption from './MultipleOption'
const MultipleValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props} className='c-multipleSelect-multipleValueRemove'>
      <Icons kind='close' />
    </components.MultiValueRemove>
  )
}
MultipleValueRemove.displayName = 'MultipleValueRemove'
export default MultipleValueRemove

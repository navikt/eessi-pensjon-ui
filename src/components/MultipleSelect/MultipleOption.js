import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import { Checkbox } from '../../Nav'

const MultipleOption = ({ data, selectProps, innerProps, isSelected, isFocused }) => {
  const id = selectProps.id + '-' + data.value
  return (
    <div id={id}>
      <div
        className={classNames('c-multipleOption', {
          selected: isSelected,
          focused: isFocused
        })} {...innerProps}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          innerProps.onClick()
        }}
      >
        <Checkbox
          id={'c-multipleOption__checkbox-' + id}
          className='c-multipleOption__checkbox'
          label={data.label}
          onChange={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          checked={isSelected}
        />
      </div>
    </div>
  )
}

MultipleOption.propTypes = {
  data: PT.object,
  selectProps: PT.object,
  innerProps: PT.object,
  isSelected: PT.bool,
  isFocused: PT.bool
}
MultipleOption.displayName = 'MultipleOption'
export default MultipleOption

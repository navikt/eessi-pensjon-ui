import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import ColorPicker, { ColorPickerProps } from './ColorPicker'

describe('components/Colorpicker', () => {
  let wrapper: ReactWrapper
  const initialMockProps: ColorPickerProps = {
    initialColor: { r: 255, g: 255, b: 255, a: 1 },
    onColorChanged: jest.fn()
  }

  it('Renders', () => {
    wrapper = mount(<ColorPicker {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Toggles open/close', () => {
    wrapper = mount(<ColorPicker {...initialMockProps} />)
    expect(wrapper.exists('.c-colorPicker__popover')).toBeFalsy()

    wrapper.find('.c-colorPicker__swatch').hostNodes().simulate('click')
    expect(wrapper.exists('.c-colorPicker__popover')).toBeTruthy()

    wrapper.find('.c-colorPicker__swatch').hostNodes().simulate('click')
    expect(wrapper.exists('.c-colorPicker__popover')).toBeFalsy()

    wrapper.find('.c-colorPicker__swatch').hostNodes().simulate('click')
    expect(wrapper.exists('.c-colorPicker__cover')).toBeTruthy()

    wrapper.find('div.c-colorPicker__cover').hostNodes().simulate('click')
    expect(wrapper.exists('div.c-colorPicker__popover')).toBeFalsy()
    expect(wrapper.exists('div.c-colorPicker__cover')).toBeFalsy()
  })
})

import React from 'react'
import Image from './Image'
import defaultLabels from './File.labels'

describe('components/File/Image', () => {
  const mockPNG = { name: 'teapot', size: 418, mimetype: 'image/png', content: { base64: '...' } }
  const initialMockProps = {
    size: '2 kB',
    labels: defaultLabels,
    file: mockPNG,
    scale: 1,
    onContentClick: jest.fn()
  }

  it('Renders', () => {
    const wrapper = mount(<Image {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Renders the image', () => {
    const wrapper = mount(<Image {...initialMockProps} />)
    expect(wrapper.find('img').props().alt).toEqual('teapot')
  })

  it('Handles onClick in content', () => {
    const wrapper = mount(<Image {...initialMockProps} />)
    wrapper.find('.c-file-Image .content').simulate('click')
    expect(initialMockProps.onContentClick).toHaveBeenCalled()
  })
})

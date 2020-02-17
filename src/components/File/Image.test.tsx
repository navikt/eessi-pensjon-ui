import { FileProps } from 'components/File/File'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import Image from './Image'
import defaultLabels from 'components/File/File.labels'
import { File } from 'declarations/types.d'

const mockPNG: File = { name: 'teapot', size: 418, mimetype: 'image/png', content: { base64: '...' } }

describe('components/File/Image', () => {
  let wrapper: ReactWrapper
  const initialMockProps: FileProps = {
    size: '2 kB',
    labels: defaultLabels,
    file: mockPNG as File,
    scale: 1,
    onClick: jest.fn(),
    overlay: <div/>,
    width: 100,
    height: 100
  }

  it('Renders', () => {
    wrapper = mount(<Image {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Renders the image', () => {
    wrapper = mount(<Image {...initialMockProps} />)
    expect(wrapper.find('img').props().alt).toEqual('teapot')
  })

  it('Handles onClick in content', () => {
    wrapper = mount(<Image {...initialMockProps} />)
    wrapper.find('.c-file-Image .content').simulate('click')
    expect(initialMockProps.onClick).toHaveBeenCalled()
  })
})

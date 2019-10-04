import React from 'react'
import Image from './Image'

describe('components/File/Image', () => {
  const t = jest.fn((translationString) => { return translationString })
  const mockPNG = { name: 'teapot', size: 418, mimetype: 'image/png', content: { base64: '...' } }
  const mockJPG = { name: 'cup of joe', size: 200, mimetype: 'image/jpeg', content: { base64: '...' } }
  const initialMockProps = {
    size: '2 kB',
    t: t,
    file: mockPNG,
    scale: 1,
    onClick: jest.fn(),
    onDeleteDocument: jest.fn(),
    downloadLink: true,
    deleteLink: true
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

  it('Renders download and delete links on mouseEnter', () => {
    const wrapper = mount(<Image {...initialMockProps} />)
    expect(wrapper.exists('.deleteLink')).toBeFalsy()
    expect(wrapper.exists('.downloadLink')).toBeFalsy()

    wrapper.setProps({ isHovering: true })
    expect(wrapper.exists('.deleteLink')).toBeTruthy()
    expect(wrapper.exists('.downloadLink')).toBeTruthy()

    wrapper.setProps({ isHovering: false })
    expect(wrapper.exists('.deleteLink')).toBeFalsy()
    expect(wrapper.exists('.downloadLink')).toBeFalsy()
  })

  it('Delete link calls onDeleteDocument on click', () => {
    const wrapper = mount(<Image {...initialMockProps} isHovering />)
    wrapper.find('.deleteLink Icons').simulate('click')
    expect(initialMockProps.onDeleteDocument).toHaveBeenCalled()
  })

  it('Generates correct downloadlink for PNGs', () => {
    const wrapper = mount(<Image {...initialMockProps} isHovering />)
    const downloadLinkProps = wrapper.find('.downloadLink > a').props()
    expect(downloadLinkProps.href).toEqual(
      'data:application/octet-stream;base64,' + encodeURIComponent(mockPNG.content.base64)
    )
    expect(downloadLinkProps.download).toEqual(mockPNG.name)
  })

  it('Handles onClick in content', () => {
    const wrapper = mount(<Image {...initialMockProps} />)
    wrapper.find('.c-file-Image .content').simulate('click')
    expect(initialMockProps.onClick).toHaveBeenCalled()
  })

  it('Generates correct downloadlink for JPGs', () => {
    const wrapper = mount(<Image {...initialMockProps} file={mockJPG} isHovering />)
    const downloadLinkProps = wrapper.find('.downloadLink > a').props()
    expect(downloadLinkProps.href).toEqual(
      'data:application/octet-stream;base64,' + encodeURIComponent(mockJPG.content.base64)
    )
    expect(downloadLinkProps.download).toEqual(mockJPG.name)
  })
})

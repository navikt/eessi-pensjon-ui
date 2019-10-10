import React from 'react'
import File from './File'

describe('components/File', () => {
  const mockPDF = { size: 404, mimetype: 'application/pdf', content: 'notnull' }
  const mockPNG = { size: 418, mimetype: 'image/png', content: 'notnull' }
  const mockOTHER = { size: 500, mimetype: 'other/other' }

  it('Renders', () => {
    const wrapper = shallow(<File file={mockPDF} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Renders Editor', () => {
    const wrapper = shallow(<File file={mockPDF} />)
    expect(wrapper.exists('Pdf')).toBeTruthy()
    expect(wrapper.exists('Image')).toBeFalsy()
    expect(wrapper.exists('Other')).toBeFalsy()
  })

  it('Renders images', () => {
    const wrapper = shallow(<File file={mockPNG} />)
    expect(wrapper.exists('Pdf')).toBeFalsy()
    expect(wrapper.exists('Image')).toBeTruthy()
    expect(wrapper.exists('Other')).toBeFalsy()
  })

  it('Renders others', () => {
    const wrapper = shallow(<File file={mockOTHER} />)
    expect(wrapper.exists('Pdf')).toBeFalsy()
    expect(wrapper.exists('Image')).toBeFalsy()
    expect(wrapper.exists('Other')).toBeTruthy()
  })
})

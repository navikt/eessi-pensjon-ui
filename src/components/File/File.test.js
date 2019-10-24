import React from 'react'
import File from './File'
import samplePDF from '../../resources/tests/samplePDF'
import sampleJPG from '../../resources/tests/sampleJPG'
import sampleOther from '../../resources/tests/sampleOther'

describe('components/File', () => {
  const initialMockProps = {
    onDeleteFile: jest.fn(),
    onPreviewFile: jest.fn(),
    onAddFile: jest.fn()
  }
  it('Renders', () => {
    const wrapper = shallow(<File file={samplePDF} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Renders Editor', () => {
    const wrapper = shallow(<File file={samplePDF} />)
    expect(wrapper.exists('Pdf')).toBeTruthy()
    expect(wrapper.exists('Image')).toBeFalsy()
    expect(wrapper.exists('Other')).toBeFalsy()
  })

  it('Renders images', () => {
    const wrapper = shallow(<File file={sampleJPG} />)
    expect(wrapper.exists('Pdf')).toBeFalsy()
    expect(wrapper.exists('Image')).toBeTruthy()
    expect(wrapper.exists('Other')).toBeFalsy()
  })

  it('Renders others', () => {
    const wrapper = shallow(<File file={sampleOther} />)
    expect(wrapper.exists('Pdf')).toBeFalsy()
    expect(wrapper.exists('Image')).toBeFalsy()
    expect(wrapper.exists('Other')).toBeTruthy()
  })

  it('Renders buttons on onMouseEnter', () => {
    const wrapper = mount(<File file={samplePDF} initialPage={3} buttons='hover' />)
    expect(wrapper.exists('.previousPage')).toBeFalsy()
    expect(wrapper.exists('.nextPage')).toBeFalsy()
    expect(wrapper.find('.link')).toHaveLength(0)
    expect(wrapper.exists('.previewLink')).toBeFalsy()
    expect(wrapper.exists('.deleteLink')).toBeFalsy()
    expect(wrapper.exists('.downloadLink')).toBeFalsy()
    expect(wrapper.exists('.addLink')).toBeFalsy()

    wrapper.simulate('mouseover')
    expect(wrapper.exists('.previousPage')).toBeTruthy()
    expect(wrapper.exists('.nextPage')).toBeTruthy()
    expect(wrapper.find('.link')).toHaveLength(4)
    expect(wrapper.exists('.previewLink')).toBeTruthy()
    expect(wrapper.exists('.deleteLink')).toBeTruthy()
    expect(wrapper.exists('.downloadLink')).toBeTruthy()
    expect(wrapper.exists('.addLink')).toBeTruthy()
  })

  it('Preview page', () => {
    const wrapper = mount(<File {...initialMockProps} file={samplePDF} buttons='visible' showPreviewButton />)
    expect(wrapper.exists('.previewLink')).toBeTruthy()

    wrapper.find('.previewLink').simulate('click')
    expect(initialMockProps.onPreviewFile).toHaveBeenCalled()
  })

  it('Delete document', () => {
    const wrapper = mount(<File {...initialMockProps} file={samplePDF} buttons='visible' showDeleteButton />)
    expect(wrapper.exists('.deleteLink')).toBeTruthy()

    wrapper.find('.deleteLink').simulate('click')
    expect(initialMockProps.onDeleteFile).toHaveBeenCalled()
  })

  it('Add document', () => {
    const wrapper = mount(<File {...initialMockProps} file={samplePDF} buttons='visible' showAddButton />)
    expect(wrapper.exists('.addLink')).toBeTruthy()

    wrapper.find('.addLink').simulate('click')
    expect(initialMockProps.onAddFile).toHaveBeenCalled()
  })

  it('Download document', () => {
    const wrapper = mount(<File {...initialMockProps} file={samplePDF} buttons='visible' showDownloadButton />)
    expect(wrapper.exists('.downloadLink')).toBeTruthy()

    wrapper.find('.downloadLink').simulate('click')
    expect(wrapper.afind('.downloadLink > a').props().href)
      .toEqual('data:application/octet-stream;base64,' + encodeURIComponent(samplePDF.content.base64))
    expect(wrapper.find('.downloadLink > a').props().download).toEqual(samplePDF.name)
  })

  it('Changes current page', () => {
    const wrapper = mount(<File {...initialMockProps} file={samplePDF} buttons='visible' />)
    expect(wrapper.find('Page').text()).toEqual('Page: 1')
    expect(wrapper.exists('.nextPage')).toBeTruthy()

    wrapper.find('.nextPage').hostNodes().simulate('click')
    expect(wrapper.find('Page').text()).toEqual('Page: 2')
    expect(wrapper.exists('.previousPage')).toBeTruthy()

    wrapper.find('.previousPage').simulate('click')
    expect(wrapper.find('Page').text()).toEqual('Page: 1')
  })
})

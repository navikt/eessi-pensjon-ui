import React from 'react'
import File from './File'
import samplePDF from '../../resources/tests/samplePDF'
import sampleJPG from '../../resources/tests/sampleJPG'
import sampleOther from '../../resources/tests/sampleOther'
jest.mock('react-pdf', () => {
  const React = require('react')
  return {
    pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
    Document: (props) => {
      setTimeout(() => {
        props.onLoadSuccess({ numPages: 5 })
      }, 500)
      return (
        <div className='mock-pdfdocument'>
          {props.children}
        </div>
      )
    },
    Page: (props) => {
      return (
        <div className='mock-pdfpage'>
          {'Page: '}{props.pageNumber}
        </div>
      )
    }
  }
})

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

  it('Renders buttons on onMouseEnter', async (done) => {
    const wrapper = mount(
      <File file={samplePDF} initialPage={3} buttons='hover' showPreviewButton showDeleteButton showDownloadButton showAddButton />
    )
    setTimeout(() => {
      wrapper.update()
      expect(wrapper.exists('.previousPage')).toBeFalsy()
      expect(wrapper.exists('.nextPage')).toBeFalsy()
      expect(wrapper.find('.link')).toHaveLength(0)
      expect(wrapper.exists('.previewLink')).toBeFalsy()
      expect(wrapper.exists('.deleteLink')).toBeFalsy()
      expect(wrapper.exists('.downloadLink')).toBeFalsy()
      expect(wrapper.exists('.addLink')).toBeFalsy()

      act(() => {
        wrapper.simulate('mouseenter')
      })
      act(() => {
        wrapper.update()
      })
      expect(wrapper.exists('.previousPage')).toBeTruthy()
      expect(wrapper.exists('.nextPage')).toBeTruthy()
      expect(wrapper.find('.link')).toHaveLength(4)
      expect(wrapper.exists('.previewLink')).toBeTruthy()
      expect(wrapper.exists('.deleteLink')).toBeTruthy()
      expect(wrapper.exists('.downloadLink')).toBeTruthy()
      expect(wrapper.exists('.addLink')).toBeTruthy()
      done()
    }, 750)
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
    expect(wrapper.find('.downloadLink > a').props().href)
      .toEqual('data:application/octet-stream;base64,' + encodeURIComponent(samplePDF.content.base64))
    expect(wrapper.find('.downloadLink > a').props().download).toEqual(samplePDF.name)
  })

  it('Changes current page', async (done) => {
    const wrapper = mount(<File {...initialMockProps} file={samplePDF} buttons='hover' />)
    act(() => {
      wrapper.simulate('mouseover')
    })
    setTimeout(() => {
      act(() => {
        wrapper.update()
      })
      expect(wrapper.find('Page').text()).toEqual('Page: 1')
      expect(wrapper.exists('.nextPage')).toBeTruthy()

      wrapper.find('.nextPage').hostNodes().simulate('click')
      expect(wrapper.find('Page').text()).toEqual('Page: 2')
      expect(wrapper.exists('.previousPage')).toBeTruthy()

      wrapper.find('.previousPage').simulate('click')
      expect(wrapper.find('Page').text()).toEqual('Page: 1')
      done()
    }, 1000)
  })
})

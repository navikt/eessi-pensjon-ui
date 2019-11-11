/* global File */

import React from 'react'
import FileUpload from './FileUpload'
import samplePDF from 'resources/tests/samplePDF'
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

describe('components/FileUpload/FileUpload', () => {
  let wrapper
  const initialMockProps = {
    acceptedMimetypes: ['application/pdf', 'text/plain'],
    afterDrop: jest.fn(),
    beforeDrop: jest.fn(),
    currentPages: [],
    files: [],
    labels: {
      accepted: 'ui:accepted',
      size: 'ui:size',
      download: 'ui:download',
      dropFilesHere: 'ui:dropFilesHere',
      fileIsTooBigLimitIs: 'ui:fileIsTooBigLimitIs',
      maxFilesExceeded: 'ui:maxFilesExceeded',
      rejected: 'ui:rejected',
      removed: 'ui:removed',
      total: 'ui:total'
    },
    maxFiles: 10,
    maxFileSize: 100000,
    onFilesChanged: jest.fn(),
    status: {}
  }

  const fileContents = 'file contents'
  const fileThatDrops = new File([fileContents], 'text.txt', { type: 'text/plain' })
  const expectedProcessedFile = {
    content: {
      base64: 'ZmlsZSBjb250ZW50cw=='
    },
    mimetype: 'text/plain',
    name: 'text.txt',
    size: 13,
    id: 'text.txt'
  }

  beforeEach(() => {
    wrapper = mount(<FileUpload {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-fileUpload')).toBeTruthy()
    expect(wrapper.exists('.c-fileUpload-placeholder')).toBeTruthy()
    expect(wrapper.exists('.c-fileUpload-placeholder-message')).toBeTruthy()
    expect(wrapper.find('.c-fileUpload-placeholder-message').render().text()).toEqual('ui:dropFilesHere')
    expect(wrapper.exists('.c-fileUpload-placeholder-status')).toBeTruthy()
    expect(wrapper.exists('.c-fileUpload-files')).toBeTruthy()
  })

  it('UseEffect: File dropped, onFilesChanged is called when dropping something', async () => {
    act(() => {
      initialMockProps.onFilesChanged.mockClear()
    })
    expect(initialMockProps.onFilesChanged).not.toHaveBeenCalled()
    await act(async () => {
      wrapper.find('input').simulate('drop', { target: { files: [fileThatDrops] } })
    })
    await act(async () => {
      wrapper.update()
    })
    expect(initialMockProps.onFilesChanged).toHaveBeenCalledWith([expectedProcessedFile])
    expect(wrapper.find('.c-fileUpload-placeholder-status').render().text()).toEqual('ui:accepted: 1, ui:rejected: 0, ui:total: 1')
  })

  it('Dropping a file too large', async () => {
    act(() => {
      initialMockProps.onFilesChanged.mockClear()
    })
    act(() => {
      wrapper.setProps({ maxFileSize: 1 })
    })
    await act(async () => {
      wrapper.find('input').simulate('drop', { target: { files: [fileThatDrops] } })
    })
    act(() => {
      wrapper.update()
    })
    expect(initialMockProps.onFilesChanged).not.toHaveBeenCalled()
    expect(wrapper.find('.c-fileUpload-placeholder-status').render().text()).toEqual('ui:fileIsTooBigLimitIs')
  })

  it('Dropping a file of a forbidden mimetype', async () => {
    act(() => {
      initialMockProps.onFilesChanged.mockClear()
    })
    act(() => {
      wrapper.setProps({ acceptedMimetypes: ['application/pdf'] })
    })
    await act(async () => {
      wrapper.find('input').simulate('drop', { target: { files: [fileThatDrops] } })
    })
    act(() => {
      wrapper.update()
    })
    expect(initialMockProps.onFilesChanged).not.toHaveBeenCalled()
    expect(wrapper.find('.c-fileUpload-placeholder-status').render().text()).toEqual('ui:accepted: 0, ui:rejected: 1, ui:total: 1')
  })

  it('Renders a file ', () => {
    wrapper = mount(<FileUpload {...initialMockProps} files={[samplePDF]} />)
    expect(wrapper.exists('.c-file')).toBeTruthy()
    expect(wrapper.find('.c-file').render().text()).toEqual('Page: 1')
  })

  it('Deleting a file', async (done) => {
    wrapper = mount(<FileUpload {...initialMockProps} files={[samplePDF]} />)
    initialMockProps.onFilesChanged.mockClear()
    expect(initialMockProps.onFilesChanged).not.toHaveBeenCalled()
    expect(wrapper.exists('.deleteLink')).toBeFalsy()

    act(() => {
      wrapper.find('.c-file').simulate('mouseover')
    })
    act(() => {
      wrapper.update()
    })
    expect(wrapper.exists('.deleteLink')).toBeTruthy()

    act(() => {
      wrapper.find('.deleteLink Icons').simulate('click')
    })
    act(() => {
      wrapper.update()
    })
    expect(initialMockProps.onFilesChanged).toHaveBeenCalledWith([])
    expect(wrapper.find('.c-fileUpload-placeholder-status').render().text()).toEqual('ui:removed red.pdf')
    done()
  })

  // async because it takes 500 ms for the mock Document to throw a onLoadSuccess with numPages
  it('With a Editor file, loaded', async (done) => {
    const wrapper = mount(<FileUpload {...initialMockProps} files={[samplePDF]} />)

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 750))
    })

    expect(wrapper.find('.c-file .mock-pdfpage').render().text()).toEqual('Page: 1')
    act(() => {
      wrapper.find('.c-file').simulate('mouseenter')
    })
    act(() => {
      wrapper.update()
    })

    expect(wrapper.exists('.previewLink')).toBeTruthy()
    act(() => {
      wrapper.find('.previewLink').simulate('click')
    })
    expect(wrapper.exists('.c-modal')).toBeTruthy()
    expect(wrapper.exists('.nextPage')).toBeTruthy()

    act(() => {
      wrapper.find('.nextPage').simulate('click')
    })
    act(() => {
      wrapper.update()
    })
    expect(wrapper.find('.mock-pdfpage').last().render().text()).toEqual('Page: 2')
    expect(wrapper.exists('.previousPage')).toBeTruthy()

    act(() => {
      wrapper.find('.previousPage').simulate('click')
    })
    act(() => {
      wrapper.update()
    })
    expect(wrapper.find('.c-file .mock-pdfpage').last().render().text()).toEqual('Page: 1')
    done()
  })
})

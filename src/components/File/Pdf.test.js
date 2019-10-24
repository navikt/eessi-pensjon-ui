import React from 'react'
import Pdf from './Pdf'
import samplePDF from 'resources/tests/samplePDF'
import defaultLabels from './File.labels'

jest.mock('react-pdf', () => {
  const React = require('react')
  return {
    pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
    Document: (props) => {
      props.onLoadSuccess({ numPages: 5 })
      return <div>{props.children}</div>
    },
    Page: (props) => {
      return 'Page: ' + props.pageNumber
    }
  }
})

describe('components/File/Pdf', () => {
  const initialMockProps = {
    size: '2 kB',
    file: samplePDF,
    currentPage: 1,
    labels: defaultLabels,
    scale: 1,
    onLoadSuccess: jest.fn()
  }

  it('Renders', () => {
    const wrapper = mount(<Pdf {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('onLoadSuccess is called wiehen mounted', () => {
    mount(<Pdf {...initialMockProps} />)
    expect(initialMockProps.onLoadSuccess).toHaveBeenCalled()
  })
})

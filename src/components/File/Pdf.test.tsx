import { IFile } from 'components/File/File'
import { mount } from 'enzyme'
import React from 'react'
import Pdf from './Pdf'
import samplePDF from 'resources/tests/samplePDF'
import defaultLabels from 'components/File/File.labels'

jest.mock('react-pdf', () => {
  const React = require('react')
  return {
    pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
    Document: (props: any) => {
      props.onLoadSuccess({ numPages: 5 })
      return <div>{props.children}</div>
    },
    Page: (props: any) => {
      return 'Page: ' + props.pageNumber
    }
  }
})

describe('components/File/Pdf', () => {
  const initialMockProps = {
    size: '2 kB',
    file: samplePDF as IFile,
    currentPage: 1,
    labels: defaultLabels,
    scale: 1,
    onClick: jest.fn(),
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

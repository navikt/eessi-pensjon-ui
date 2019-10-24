import React from 'react'
import Other from './Other'
import defaultLabels from './File.labels'

describe('components/File/Other', () => {
  const mockFile = { name: 'teapot.oolong', size: 418, mimetype: 'some/thing', content: { base64: '...' } }
  const initialMockProps = {
    size: '2 kB',
    labels: defaultLabels,
    file: mockFile,
    scale: 1,
    onContentClick: jest.fn()
  }

  it('Renders', () => {
    const wrapper = mount(<Other {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Renders the extension', () => {
    const wrapper = mount(<Other {...initialMockProps} />)
    expect(wrapper.find('.extension').text()).toEqual('oolong')
  })

  it('Handles onContentClick in content', () => {
    const wrapper = mount(<Other {...initialMockProps} />)
    wrapper.find('.c-file-Other .content').simulate('click')
    expect(initialMockProps.onContentClick).toHaveBeenCalled()
  })
})

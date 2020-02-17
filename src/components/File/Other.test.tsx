import { File } from 'declarations/types.d'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import defaultLabels from 'components/File/File.labels'
import Other from './Other'

const mockFile: File = { name: 'teapot.oolong', size: 418, mimetype: 'some/thing', content: { base64: '...' } }

describe('components/File/Other', () => {
  let wrapper: ReactWrapper
  const initialMockProps = {
    size: '2 kB',
    labels: defaultLabels,
    file: mockFile as File,
    scale: 1,
    onClick: jest.fn(),
    overlay: <div/>,
    width: 100,
    height: 100
  }

  it('Renders', () => {
    wrapper = mount(<Other {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Renders the extension', () => {
    wrapper = mount(<Other {...initialMockProps} />)
    expect(wrapper.find('.extension').text()).toEqual('oolong')
  })

  it('Handles onContentClick in content', () => {
    wrapper = mount(<Other {...initialMockProps} />)
    wrapper.find('.c-file-Other .content').simulate('click')
    expect(initialMockProps.onClick).toHaveBeenCalled()
  })
})

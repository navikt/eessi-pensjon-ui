import React from 'react'
import { Alert } from './Alert'

describe('components/Alert/Alert', () => {
  let wrapper
  const initialMockProps = {
    status: 'OK',
    message: 'mockErrorMessage',
    error: undefined,
    onClear: jest.fn()
  }

  it('Renders', () => {
    wrapper = mount(<Alert {...initialMockProps} type='server' />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure as server', () => {
    wrapper = mount(<Alert {...initialMockProps} type='server' />)
    expect(wrapper.exists('.c-alert.server')).toBeTruthy()
    expect(wrapper.render().text()).toEqual('mockErrorMessage')
  })

  it('Has proper HTML structure as client', () => {
    wrapper = mount(<Alert {...initialMockProps} type='client' />)
    expect(wrapper.exists('.c-alert.client')).toBeTruthy()
    expect(wrapper.render().text()).toEqual('mockErrorMessage')
  })

  it('Has proper HTML structure as client in OK type', () => {
    wrapper = mount(<Alert {...initialMockProps} type='client' />)
    expect(wrapper.render().hasClass('alertstripe--suksess')).toBeTruthy()
  })

  it('Has proper HTML structure as client in ERROR type', () => {
    wrapper = mount(<Alert {...initialMockProps} type='client' status='WARNING' />)
    expect(wrapper.render().hasClass('alertstripe--advarsel')).toBeTruthy()
  })

  it('Has proper HTML structure as client in ERROR type', () => {
    wrapper = mount(<Alert {...initialMockProps} type='client' status='ERROR' />)
    expect(wrapper.render().hasClass('alertstripe--feil')).toBeTruthy()
  })

  it('Close button clears alert', () => {
    wrapper = mount(<Alert {...initialMockProps} type='client' status='ERROR' />)
    wrapper.find('.closeIcon').hostNodes().simulate('click')
    expect(initialMockProps.onClear).toHaveBeenCalled()
  })

  it('Pretty prints a error message', () => {
    const error = {
      status: '500',
      message: 'message',
      error: 'error',
      uuid: 'uuid'
    }
    wrapper = mount(<Alert {...initialMockProps} type='server' error={error} />)
    expect(wrapper.render().text()).toEqual('mockErrorMessage: 500 - message - error - uuid')
  })
})

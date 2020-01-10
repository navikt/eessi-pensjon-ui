import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import DatePicker, { DatePickerProps } from './DatePicker'

describe('components/DatePicker', () => {
  let wrapper: ReactWrapper
  const initialMockProps: DatePickerProps = {
    ids: {
      day: 'mock-day-id',
      month: 'mock-month-id',
      year: 'mock-year-id'
    },
    onChange: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<DatePicker {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Correctly validates day', () => {
    act(() => {
      wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '99' } })
    })
    expect(initialMockProps.onChange).toHaveBeenCalledWith({ day: '99' })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '-1' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '0' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '10' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '50' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '31' } })
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '3' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy();

    (initialMockProps.onChange as jest.Mock).mockReset()
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '4' } })
    wrapper.update()
    expect(initialMockProps.onChange).toHaveBeenCalledWith({ day: '31', month: '4' })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '29' } })
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2' } })
    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2001' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2000' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2001' } })
    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '28' } })
    wrapper.update()
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()
  })

  it('Correctly validates month', () => {
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: 'MM' } })
    expect(initialMockProps.onChange).toHaveBeenCalledWith({ month: 'MM' })
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '-1' } })
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '0' } })
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '1' } })
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '12' } })
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '13' } })
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeTruthy()
  })

  it('Correctly validates year', () => {
    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: 'YYYY' } })
    expect(initialMockProps.onChange).toHaveBeenCalledWith({ year: 'YYYY' })
    expect(wrapper.exists('.DatePickerYearInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '0' } })
    expect(wrapper.exists('.DatePickerYearInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2000' } })
    expect(wrapper.exists('.DatePickerYearInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '3000' } })
    expect(wrapper.exists('.DatePickerYearInput .skjemaelement__input--harFeil')).toBeFalsy()
  })

  it('Renders input errors correctly', () => {
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeFalsy()
    expect(wrapper.exists('.DatePickerYearInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '99' } })
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: 'xxx' } })
    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: 'xxx' } })

    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()
    expect(wrapper.exists('.DatePickerMonthInput .skjemaelement__input--harFeil')).toBeTruthy()
    expect(wrapper.exists('.DatePickerYearInput .skjemaelement__input--harFeil')).toBeTruthy()
  })

  it('Renders total errors correctly', () => {
    expect(wrapper.exists('.feilmelding')).toBeFalsy()
    wrapper.setProps({ error: 'ERROR' })
    expect(wrapper.exists('.feilmelding')).toBeTruthy()
    expect(wrapper.find('.feilmelding').hostNodes().text()).toEqual('ERROR')
  })
})

describe('components/FocusGroup Event bubbling', () => {
  jest.useFakeTimers()
  let wrapper: ReactWrapper

  it('Focus event bubbles to parent', async (done) => {
    // @ts-ignore
    const eventHandler = (event: FocusEvent<Element>) => {
      expect(event.relatedTarget).toBeTruthy()
      done()
    }

    wrapper = mount(
      <DatePicker onFocus={eventHandler} />
    )
    act(() => {
      wrapper.childAt(0).simulate('focus', { relatedTarget: true })
    })
  })

  it('Blur event bubbles to parent', (done) => {
    // @ts-ignore
    const eventHandler = (e: FocusEvent<Element>) => {
      expect(e.relatedTarget).toBeTruthy()
      done()
    }

    wrapper = mount(
      <DatePicker onBlur={eventHandler} />
    )
    act(() => {
      wrapper.childAt(0).simulate('blur', { relatedTarget: true })
    })
    jest.runAllTimers()
  })
})

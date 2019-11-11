import React from 'react'
import DatePicker from './DatePicker'

describe('components/DatePicker', () => {
  let wrapper
  const initialMockProps = {
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
    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: 'DD' } })
    expect(initialMockProps.onChange).toHaveBeenCalledWith({ day: 'DD' })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '-1' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '0' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '10' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '50' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '31' } })
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '3' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()

    initialMockProps.onChange.mockReset()
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '4' } })
    expect(initialMockProps.onChange).toHaveBeenCalledWith({ day: '31', month: '4' })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '29' } })
    wrapper.find('.DatePickerMonthInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2' } })
    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2001' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeTruthy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2000' } })
    expect(wrapper.exists('.DatePickerDayInput .skjemaelement__input--harFeil')).toBeFalsy()

    wrapper.find('.DatePickerYearInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '2001' } })
    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: '28' } })
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

    wrapper.find('.DatePickerDayInput .skjemaelement__input').hostNodes().simulate('change', { target: { value: 'xxx' } })
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

  it('Focus event bubbles to parent', async (done) => {
    const eventHandler = (event) => {
      expect(event.testFlag).toBeTruthy()
      done()
    }

    const wrapper = mount(
      <DatePicker onFocus={eventHandler} />
    )
    act(() => {
      wrapper.childAt(0).simulate('focus', { testFlag: true })
    })
  })

  it('Blur event bubbles to parent', (done) => {
    const eventHandler = (event) => {
      expect(event.testFlag).toBeTruthy()
      done()
    }

    const wrapper = mount(
      <DatePicker onBlur={eventHandler} />
    )
    act(() => {
      wrapper.childAt(0).simulate('blur', { testFlag: true })
    })
    jest.runAllTimers()
  })
})

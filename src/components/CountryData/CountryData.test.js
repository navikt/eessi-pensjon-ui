import CountryData from './CountryData'

describe('components/CountryData', () => {
  it('getData', () => {
    let data = CountryData.getCountryInstance('en')
    expect(data.getData).toBeDefined()
    expect(data.findByValue('no').label).toEqual('Norway')

    data = CountryData.getCountryInstance('nb')
    expect(data.getData).toBeDefined()
    expect(data.findByValue('no').label).toEqual('Norge')

    data = CountryData.getCountryInstance('xx')
    expect(data.getData).toBeDefined()
    expect(data.findByValue('no').label).toEqual(undefined)
  })

  it('findByValue', () => {
    const countryData = CountryData.getCountryInstance('nb')
    const country = countryData.findByValue('NO')
    expect(country).toMatchObject({
      alpha2: 'NO',
      alpha3: 'NOR',
      countryCallingCodes: ['+47'],
      currencies: [{ currencyValue: 'NOK', currencyLabel: 'Norwegian Krone' }],
      emoji: '🇳🇴',
      ioc: 'NOR',
      languages: ['nor'],
      name: 'Norway',
      status: 'assigned',
      label: 'Norge',
      value: 'NO',
      value3: 'NOR'
    })
  })

  it('findByValue3', () => {
    const countryData = CountryData.getCountryInstance('nb')
    const country = countryData.findByValue3('NOR')
    expect(country).toMatchObject({
      alpha2: 'NO',
      alpha3: 'NOR',
      countryCallingCodes: ['+47'],
      currencies: [{ currencyValue: 'NOK', currencyLabel: 'Norwegian Krone' }],
      emoji: '🇳🇴',
      ioc: 'NOR',
      languages: ['nor'],
      name: 'Norway',
      status: 'assigned',
      label: 'Norge',
      value: 'NO',
      value3: 'NOR'
    })
  })

  it('exists', () => {
    const countryData = CountryData.getCountryInstance('nb')
    expect(countryData.exists('xx')).toBeFalsy()
    expect(countryData.exists('no')).toBeTruthy()
  })

  it('filterByValueOnArray', () => {
    const countryData = CountryData.getCountryInstance('nb')
    const data = countryData.filterByValueOnArray(['NO', 'SE', 'FI', 'DK'])
    expect(data).toMatchObject([
      {
        alpha2: 'DK',
        alpha3: 'DNK',
        countryCallingCodes: ['+45'],
        currencies: [{
          currencyLabel: 'Danish Krone',
          currencyValue: 'DKK'
        }],
        emoji: '🇩🇰',
        ioc: 'DEN',
        languages: ['dan'],
        name: 'Denmark',
        status: 'assigned',
        label: 'Danmark',
        value: 'DK',
        value3: 'DNK'
      },
      {
        alpha2: 'FI',
        alpha3: 'FIN',
        countryCallingCodes: ['+358'],
        currencies: [{
          currencyLabel: 'Euro',
          currencyValue: 'EUR'
        }],
        emoji: '🇫🇮',
        ioc: 'FIN',
        languages: ['fin', 'swe'],
        name: 'Finland',
        status: 'assigned',
        label: 'Finland',
        value: 'FI',
        value3: 'FIN'
      },
      {
        alpha2: 'NO',
        alpha3: 'NOR',
        countryCallingCodes: ['+47'],
        currencies: [{
          currencyLabel: 'Norwegian Krone',
          currencyValue: 'NOK'
        }],
        emoji: '🇳🇴',
        ioc: 'NOR',
        languages: ['nor'],
        name: 'Norway',
        status: 'assigned',
        label: 'Norge',
        value: 'NO',
        value3: 'NOR'
      },
      {
        alpha2: 'SE',
        alpha3: 'SWE',
        countryCallingCodes: ['+46'],
        currencies: [{
          currencyLabel: 'Swedish Krona',
          currencyValue: 'SEK'
        }],
        emoji: '🇸🇪',
        ioc: 'SWE',
        languages: ['swe'],
        name: 'Sweden',
        status: 'assigned',
        label: 'Sverige',
        value: 'SE',
        value3: 'SWE'
      }]
    )
  })
})

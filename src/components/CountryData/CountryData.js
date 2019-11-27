import _ from 'lodash'
import { getNames } from 'i18n-iso-countries'
import { countries } from 'country-data-list'
import currencyToName from '@piotrgorecki/i18n-currency-name'

/* countries: {
    alpha2: 'AC',
    alpha3: '',
    countryCallingCodes: ['+247'],
    currencies: ['USD'],
    emoji: '',
    ioc: 'SHP',
    languages: ['eng'],
    name: 'Ascension Island',
    status: 'reserved',
  },
 */

class CountryList {
  constructor (locale) {
    this.locale = locale || 'en'
    this.translations = getNames(this.locale) || {}
    this.currencyLocale = this.locale
    this.testCurrencyTranslation = currencyToName('USD', this.currencyLocale)
    if (!this.testCurrencyTranslation) {
      this.currencyLocale = 'en'
    }
    this.countries = countries.all.map(country => ({
      ...country,
      label: this.translations[country.alpha2],
      value: country.alpha2,
      value3: country.alpha3,
      currencies: country.currencies.map(currency => ({
        currencyValue: currency,
        currencyLabel: currencyToName(currency, this.currencyLocale)
      }))
    }))
  }

  getData = () => {
    return this.countries
  }

  findByValue = (value) => {
    return _.find(this.countries, { value: value.toUpperCase() })
  }

  findByValue3 = (value) => {
    return _.find(this.countries, { value3: value.toUpperCase() })
  }

  exists = (country) => {
    return this.findByValue(country.toUpperCase()) !== undefined
  }

  filterByValueOnArray = (needles) => {
    return _.filter(this.countries, country => _.includes(needles, country.value.toUpperCase()))
  }
}

class CurrencyList {
  constructor (locale) {
    this.locale = locale || 'en'
    this.currencyLocale = this.locale
    this.testCurrencyTranslation = currencyToName('USD', this.currencyLocale)
    if (!this.testCurrencyTranslation) {
      this.currencyLocale = 'en'
    }
    this.currencies = []
    countries.all.forEach(country => {
      country.currencies.forEach(currency => {
        this.currencies.push({
          ...country,
          label: this.translations[country.alpha2],
          value: country.alpha2,
          currencyLabel: currencyToName(currency, this.currencyLocale),
          currencyValue: currency
        })
      })
    })
    console.log(this.currencies)
  }

  getData = () => {
    return this.currencies
  }

  findByValue = (value) => {
    return _.find(this.currencies, { value: value.toUpperCase() })
  }
}

const CountryData = (() => {
  const instances = {
    country: {},
    currency: {}
  }

  return {
    getCountryInstance: (locale) => {
      if (!instances.country.locale) {
        instances.country[locale] = new CountryList(locale)
      }
      return instances.country[locale]
    },
    getCurrencyInstance: (locale) => {
      if (!instances.currency.locale) {
        instances.currency[locale] = new CurrencyList(locale)
      }
      return instances.currency[locale]
    }

  }
})()

export default CountryData

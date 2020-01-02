const CountryErrorStyle = (error: any) => ({
  container: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: error ? '#f3e3e3' : '#fff',
    borderRadius: 4,
    borderColor: error ? '1 px solid #ba3a26' : '20px solid #b7b1a9',
    boxShadow: state.isFocused ? '0 0 0 3px #FFBD66' : ''
  }),
  control: (styles: any) => ({
    ...styles,
    borderColor: error ? '#ba3a26' : '#b7b1a9',
    backgroundColor: error ? '#f3e3e3' : '#fff',
    ':hover': {
      borderColor: '#0067c5',
      transition: 'border-color 200ms cubic-bezier(0.465, 0.183, 0.153, 0.946)'
    }
  })
})

CountryErrorStyle.displayName = 'CountryErrorStyle'
export default CountryErrorStyle

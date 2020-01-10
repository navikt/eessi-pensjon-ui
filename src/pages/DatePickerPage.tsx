import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'types.d'
import Container from './Container'
import DatePicker from 'components/DatePicker/DatePicker'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { connect } from '../store'
import { Checkbox, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
import Mustache from 'mustache'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const mapStateToProps = (state: State) => ({ highContrast: state.highContrast })

const DatePickerPage: React.FC<PageProps> = ({ highContrast }: PageProps): JSX.Element => {
  const [disabled, setDisabled] = useState<boolean>(false)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>Date picker</Systemtittel>
        <Normaltekst>Date picker component rendered as three separate input boxes, <a href='https://design-system.service.gov.uk/patterns/dates/'>following the best practices from gov.uk</a>. </Normaltekst>
        <Normaltekst className='pb-4'>This solution was adopted after user tests showed that dropdown-style date pickers are often confusing for the user, and harder to interact for users with accessibility issues.</Normaltekst>

        <Undertittel className='pt-4 pb-4'>Default datepicker</Undertittel>

        <DatePicker className='w-50' />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<DatePicker/>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Datepicker with initial values and callback function</Undertittel>

        <Normaltekst>We can optionally add initial date values.</Normaltekst>
        <Normaltekst className='pb-4'>The <code>onChange</code> callback function will give you an object with day, month and year.</Normaltekst>

        <DatePicker
          className='w-50'
          initialValues={{ day: '3', month: '6', year: '1986' }}
          onChange={(date) => window.alert('Date changed with  ' + JSON.stringify(date))}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<DatePicker \n' +
          '  initialValues={{day: 3, month: 6, year: 1986}} \n' +
          '  onChange={(date) => window.alert("Date changed with  " + JSON.stringify(date))}\n' +
          '/>'}
        </SyntaxHighlighter>

        <Systemtittel className='pt-4 pb-4'>Date picker with error style</Systemtittel>

        <DatePicker
          className='w-50'
          initialValues={{ day: '3', month: '6', year: '2096' }}
          error='Please do not choose a date from the future'
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<DatePicker \n' +
          '  initialValues={{day: 3, month: 6, year: 2096}} \n' +
          '  error=\'Please do not choose a date from the future\'\n' +
          '/>'}
        </SyntaxHighlighter>

        <Systemtittel className='pt-4 pb-4'>Disabled date picker</Systemtittel>

        <Checkbox label='Disable the datepicker' checked={disabled} onChange={() => setDisabled(!disabled)} />

        <DatePicker
          className='w-50'
          disabled={disabled}
        />
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {Mustache.render('<DatePicker \n' +
          '  disabled={ {{disabled}} } \n' +
          '/>', { disabled: disabled.toString() })}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { DatePicker } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
        <Normaltekst className='pb-4'>Default component's classname: <code>c-datePicker</code></Normaltekst>

        <Undertittel className='pt-4 pb-4'>React props</Undertittel>
        <table className='tabell'>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>className</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>Additional classnames</td>
              <td>-</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Toggle disabled state on date picker input</td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td>error</td>
              <td><code>string</code></td>
              <td>false</td>
              <td>If given an error message, it is displayed, and error style is applied</td>
              <td>-</td>
            </tr>
            <tr>
              <td>ids</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>object with of ID strings to be applied to children input components, in a <code>{'{'}day: 'id', month: 'id', year: 'id'{'}'}</code> structure</td>
              <td><code>{'{}'}</code></td>
            </tr>
            <tr>
              <td>initialValues</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>object with initial date values, in a <code>{'{'}day: 1, month: 1, year: 1970{'}'}</code> structure</td>
              <td><code>{'{}'}</code></td>
            </tr>
            <tr>
              <td>labels</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>object with optional input labels, in a <code>{'{'}day: 'label', month: 'label', year: 'label'{'}'}</code>  structure</td>
              <td><code>{'{'} day: 'Dag', month: 'Måned', year: 'År' {'}'}</code></td>
            </tr>
            <tr>
              <td>onBlur</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function when datepicker is blurred, that is, it loses focus - useful for a validation check</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function when datepicker is changed - note that dates may be incomplete at any time</td>
              <td>-</td>
            </tr>
            <tr>
              <td>onFocus</td>
              <td><code>function</code></td>
              <td>false</td>
              <td>Callback function when datepicker is focused, - useful for clearing validation messages</td>
              <td>-</td>
            </tr>
            <tr>
              <td>placeholders</td>
              <td><code>object</code></td>
              <td>false</td>
              <td>object with optional input placeholders, in a <code>{'{'}day: 'placeholder', month: 'placeholder', year: 'placeholder'{'}'}</code>  structure</td>
              <td><code>{'{'} day: 'DD', month: 'MM', year: 'ÅÅÅÅ' {'}'}</code></td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </Container>
  )
}

export default connect(mapStateToProps, () => {})(DatePickerPage)

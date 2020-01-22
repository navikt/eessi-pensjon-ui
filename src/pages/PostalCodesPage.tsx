import { PageProps } from 'pages/index'
import React, { useState } from 'react'
import { State } from 'reducer'
import Container from './Container'
import PostalCodes from 'components/PostalCodes/PostalCodes'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import light from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark'
import { useSelector } from 'react-redux'
import { Input, Hovedknapp, Normaltekst, Panel, Systemtittel, Undertittel } from '../Nav'
SyntaxHighlighter.registerLanguage('jsx', jsx)

const PostalCodesPage: React.FC<PageProps> = (): JSX.Element => {
  const highContrast = useSelector<State>(state => state.highContrast)
  const [zipCode, setZipCode] = useState<string>('0001')
  const [city, setCity] = useState<string | undefined>(undefined)
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='mt-4 mb-4'>Postal Code util </Systemtittel>
        <Normaltekst className='mt-4 mb-4'>This JS class loads all Norwegian zip codes in key/value</Normaltekst>

        <Input
          className='w-25' label='Zip Code' value={zipCode} onChange={(e) => {
            setZipCode(e.target.value)
          }}
        />
        <Hovedknapp
          onClick={() => setCity(PostalCodes.get(zipCode))}
        >
          Find city
        </Hovedknapp>
        <Normaltekst className='mt-4 mb-4'>Answer: {city}</Normaltekst>

        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'<Hovedknapp\n' +
           '  onClick={() =>setCity(PostalCodes.get(zipCode))}\n' +
           '/>\n' +
          '  Find City\n' +
          '</Hovedknapp>'}
        </SyntaxHighlighter>

        <Undertittel className='pt-4 pb-4'>Component import</Undertittel>
        <SyntaxHighlighter language='javascript' style={highContrast ? dark : light}>
          {'import { PostalCodes } from \'eessi-pensjon-ui\''}
        </SyntaxHighlighter>
      </Panel>
    </Container>
  )
}

export default PostalCodesPage

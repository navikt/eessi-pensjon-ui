import { PageProps } from 'pages/index'
import React from 'react'
import Container from './Container'
import PDFEditor from 'applications/PDFEditor'
import { Normaltekst, Panel, Systemtittel } from '../Nav'

const PDFEditorPage: React.FC<PageProps> = (): JSX.Element => {
  return (
    <Container>
      <Panel className='p-4'>
        <Systemtittel className='pt-4 pb-4'>PDF Editor</Systemtittel>
        <Normaltekst>This application takes PDF and image files, and allows you to combine pages, add watermarks, add separator texts, and combine up to 4 PDFs</Normaltekst>
        <PDFEditor />
      </Panel>
    </Container>
  )
}

export default PDFEditorPage

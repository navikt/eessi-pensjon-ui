import React from 'react'
import { Systemtittel, UndertekstBold } from '../Nav'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import './Container.css'
const Container = ({ className, children }) => (
  <div className={classNames('_container', className)}>
    <aside>
      <nav>
        <div className='pb-3 ml-3'>
          <Link className='p-0' to='/'><img alt='logo' className='eessi-pensjon-logo' src={require('../resources/images/earth.png')} /></Link>
          <UndertekstBold><Link className='p-0' to='/'>EESSI Pensjon UI</Link></UndertekstBold>
        </div>
        <Systemtittel className='pb-3'>Applications</Systemtittel>
        <ul className='pb-3'>
          <li><Link to='/Dashboard'>Dashboard</Link></li>
          <li><Link to='/PDFEditor'>PDF editor</Link></li>
        </ul>
        <Systemtittel className='pb-3'>Components</Systemtittel>
        <ul className='pb-3'>
          <li><Link to='/Alert'>Alert</Link></li>
          <li><Link to='/Banner'>Banner</Link></li>
          <li><Link to='/ColorPicker'>Color picker</Link></li>
          <li><Link to='/CountryUtils'>Country utils</Link></li>
          <li><Link to='/DatePicker'>Date picker</Link></li>
          <li><Link to='/File'>File</Link></li>
          <li><Link to='/FileUpload'>File upload</Link></li>
          <li><Link to='/Flag'>Flag</Link></li>
          <li><Link to='/Icons'>Icons</Link></li>
          <li><Link to='/Modal'>Modal</Link></li>
          <li><Link to='/MultipleSelect'>Multiple select</Link></li>
          <li><Link to='/Nav'>Nav elements</Link></li>
          <li><Link to='/ProgressBar'>Progress bar</Link></li>
          <li><Link to='/Psycho'>Psycho</Link></li>
          <li><Link to='/RefreshButton'>Refresh button</Link></li>
          <li><Link to='/TableSorter'>Table sorter</Link></li>
          <li><Link to='/WaitingPanel'>Waiting panel</Link></li>
        </ul>
      </nav>
    </aside>
    <article className={classNames('body', className)}>
      {children}
    </article>
  </div>
)

export default Container

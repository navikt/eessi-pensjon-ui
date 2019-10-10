import React from 'react'
import { Systemtittel } from '../Nav'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import './Container.css'
const Container = ({ className, children }) => (
  <div className={classNames('_container', className)}>
    <aside>
      <nav>
        <Systemtittel><Link to='/'>Applications</Link></Systemtittel>
        <ul>
          <li><Link to='/Dashboard'>Dashboard</Link></li>
          <li><Link to='/PDFEditor'>PDFEditor</Link></li>
        </ul>
        <Systemtittel><Link to='/'>Components</Link></Systemtittel>
        <ul>
          <li><Link to='/Alert'>Alert</Link></li>
          <li><Link to='/Banner'>Banner</Link></li>
          <li><Link to='/ColorPicker'>ColorPicker</Link></li>
          <li><Link to='/CountryUtils'>CountryUtils</Link></li>
          <li><Link to='/DatePicker'>DatePicker</Link></li>
          <li><Link to='/File'>File</Link></li>
          <li><Link to='/FileUpload'>FileUpload</Link></li>
          <li><Link to='/Flag'>Flag</Link></li>
          <li><Link to='/Modal'>Modal</Link></li>
          <li><Link to='/MultipleSelect'>MultipleSelect</Link></li>
          <li><Link to='/Nav'>Nav elements</Link></li>
          <li><Link to='/Psycho'>Psycho</Link></li>
          <li><Link to='/RefreshButton'>Refresh Button</Link></li>
          <li><Link to='/TableSorter'>TableSorter</Link></li>
          <li><Link to='/WaitingPanel'>WaitingPanel</Link></li>
        </ul>
      </nav>
    </aside>
    <article className={classNames('body', className)}>
      {children}
    </article>
  </div>
)

export default Container

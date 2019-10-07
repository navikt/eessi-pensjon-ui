import 'core-js/es/object/assign' // IE 11 compatibility
import 'core-js/es/object/entries' // IE 11 compatibility
import 'core-js/es/object/keys' // IE 11 compatibility
import 'core-js/es/array/includes' // IE 11 compatibility
import 'core-js/es/array/find' // IE 11 compatibility
import 'core-js/es/map' // IE 11 compatibility
import 'core-js/es/set' // IE 11 compatibility
import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Switch, Route, Router } from 'react-router'
import * as Applications from './applications'
import * as Pages from './pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'index.css'
// import 'index_highContrast.css'

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route exact path='/Alert' component={Pages.Alert} />
      <Route exact path='/Banner' component={Pages.Banner} />
      <Route exact path='/ColorPicker' component={Pages.ColorPicker} />
      <Route exact path='/CountryUtils' component={Pages.CountryUtils} />
      <Route exact path='/DatePicker' component={Pages.DatePicker} />
      <Route exact path='/File' component={Pages.File} />
      <Route exact path='/FileUpload' component={Pages.FileUpload} />
      <Route exact path='/Flag' component={Pages.Flag} />
      <Route exact path='/Modal' component={Pages.Modal} />
      <Route exact path='/MultipleSelect' component={Pages.MultipleSelect} />
      <Route exact path='/Nav' component={Pages.Nav} />
      <Route exact path='/PDFEditor' component={Applications.PDFEditor} />
      <Route exact path='/Psycho' component={Pages.Psycho} />
      <Route exact path='/RefreshButton' component={Pages.RefreshButton} />
      <Route exact path='/WaitingPanel' component={Pages.WaitingPanel} />
      <Route path='/' component={Pages.IndexPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
)

import 'core-js/es/object/assign' // IE 11 compatibility
import 'core-js/es/object/entries' // IE 11 compatibility
import 'core-js/es/object/keys' // IE 11 compatibility
import 'core-js/es/array/includes' // IE 11 compatibility
import 'core-js/es/array/find' // IE 11 compatibility
import 'core-js/es/map' // IE 11 compatibility
import 'core-js/es/set' // IE 11 compatibility
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'index.css'

import DashboardPage from './pages/DashboardPage'
import PDFEditorPage from './pages/PDFEditorPage'
import AlertPage from './pages/AlertPage'
import BannerPage from './pages/BannerPage'
import ColorPickerPage from './pages/ColorPickerPage'
import CountryUtilsPage from './pages/CountryUtilsPage'
import DatePickerPage from './pages/DatePickerPage'
import FilePage from './pages/FilePage'
import FileUploadPage from './pages/FileUploadPage'
import FlagPage from './pages/FlagPage'
import IndexPage from './pages/IndexPage'
import IconsPage from './pages/IconsPage'
import ModalPage from './pages/ModalPage'
import MultipleSelectPage from './pages/MultipleSelectPage'
import NavPage from './pages/NavPage'
import PaginationPage from './pages/PaginationPage'
import PostalCodesPage from './pages/PostalCodesPage'
import ProgressBarPage from './pages/ProgressBarPage'
import PsychoPage from './pages/PsychoPage'
import RefreshButtonPage from './pages/RefreshButtonPage'
import TableSorterPage from './pages/TableSorterPage'
import WaitingPanelPage from './pages/WaitingPanelPage'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path='/Dashboard' component={DashboardPage} />
      <Route exact path='/PDFEditor' component={PDFEditorPage} />
      <Route exact path='/Alert' component={AlertPage} />
      <Route exact path='/Banner' component={BannerPage} />
      <Route exact path='/ColorPicker' component={ColorPickerPage} />
      <Route exact path='/CountryUtils' component={CountryUtilsPage} />
      <Route exact path='/DatePicker' component={DatePickerPage} />
      <Route exact path='/File' component={FilePage} />
      <Route exact path='/FileUpload' component={FileUploadPage} />
      <Route exact path='/Flag' component={FlagPage} />
      <Route exact path='/Icons' component={IconsPage} />
      <Route exact path='/Modal' component={ModalPage} />
      <Route exact path='/MultipleSelect' component={MultipleSelectPage} />
      <Route exact path='/Nav' component={NavPage} />
      <Route exact path='/Pagination' component={PaginationPage} />
      <Route exact path='/PostalCodes' component={PostalCodesPage} />
      <Route exact path='/ProgressBar' component={ProgressBarPage} />
      <Route exact path='/Psycho' component={PsychoPage} />
      <Route exact path='/RefreshButton' component={RefreshButtonPage} />
      <Route exact path='/TableSorter' component={TableSorterPage} />
      <Route exact path='/WaitingPanel' component={WaitingPanelPage} />
      <Route path='/' component={IndexPage} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
)

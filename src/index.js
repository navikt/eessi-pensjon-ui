// IE 11
import 'react-app-polyfill/ie11'
import 'core-js/es/object/assign'
import 'core-js/es/object/entries'
import 'core-js/es/object/keys'
import 'core-js/es/array/includes'
import 'core-js/es/array/find'
import 'core-js/es/map'
import 'core-js/es/set'
import 'core-js/stable/number'
import 'core-js/stable/promise'
import 'core-js/stable/url-search-params'

import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from 'store'
import reducer, { initialState } from 'reducer'
import './minibootstrap.css'
import './index.css'
import './index_highContrast.css'

import DashboardPage from './pages/DashboardPage'
import PDFEditorPage from './pages/PDFEditorPage'
import AlertPage from './pages/AlertPage'
import BannerPage from './pages/BannerPage'
import ColorPickerPage from './pages/ColorPickerPage'
import CountryUtilsPage from './pages/CountryUtilsPage'
import DatePickerPage from './pages/DatePickerPage'
import ExpandingPanelPage from './pages/ExpandingPanelPage'
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
import EESSIPensjonVeilederPage from './pages/EESSIPensjonVeilederPage'
import RefreshButtonPage from './pages/RefreshButtonPage'
import TableSorterPage from './pages/TableSorterPage'
import WaitingPanelPage from './pages/WaitingPanelPage'

ReactDOM.render(
  <StoreProvider initialState={initialState} reducer={reducer}>
    <HashRouter>
      <Switch>
        <Route exact path='/Dashboard' component={DashboardPage} />
        <Route exact path='/PDFEditor' component={PDFEditorPage} />
        <Route exact path='/Alert' component={AlertPage} />
        <Route exact path='/Banner' component={BannerPage} />
        <Route exact path='/ColorPicker' component={ColorPickerPage} />
        <Route exact path='/CountryUtils' component={CountryUtilsPage} />
        <Route exact path='/DatePicker' component={DatePickerPage} />
        <Route exact path='/ExpandingPanel' component={ExpandingPanelPage} />
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
        <Route exact path='/EESSIPensjonVeileder' component={EESSIPensjonVeilederPage} />
        <Route exact path='/RefreshButton' component={RefreshButtonPage} />
        <Route exact path='/TableSorter' component={TableSorterPage} />
        <Route exact path='/WaitingPanel' component={WaitingPanelPage} />
        <Route path='/' component={IndexPage} />
      </Switch>
    </HashRouter>
  </StoreProvider>,
  document.getElementById('root')
)

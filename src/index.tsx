// IE 11
import { IS_PRODUCTION } from 'constants/environment'
import 'core-js/es/array/find'
import 'core-js/es/array/includes'
import 'core-js/es/map'
import 'core-js/es/object/assign'
import 'core-js/es/object/entries'
import 'core-js/es/object/keys'
import 'core-js/es/set'
import 'core-js/stable/number'
import 'core-js/stable/promise'
import 'core-js/stable/url-search-params'
import AlertPage from 'pages/AlertPage'
import BannerPage from 'pages/BannerPage'
import ColorPickerPage from 'pages/ColorPickerPage'
import CountryUtilsPage from 'pages/CountryUtilsPage'
import DashboardPage from 'pages/DashboardPage'
import DatePickerPage from 'pages/DatePickerPage'
import EESSIPensjonVeilederPage from 'pages/EESSIPensjonVeilederPage'
import ExpandingPanelPage from 'pages/ExpandingPanelPage'
import FilePage from 'pages/FilePage'
import FileUploadPage from 'pages/FileUploadPage'
import FlagPage from 'pages/FlagPage'
import IconsPage from 'pages/IconsPage'
import IndexPage from 'pages/IndexPage'
import ModalPage from 'pages/ModalPage'
import MultipleSelectPage from 'pages/MultipleSelectPage'
import NavPage from 'pages/NavPage'
import PaginationPage from 'pages/PaginationPage'
import PDFEditorPage from 'pages/PDFEditorPage'
import PostalCodesPage from 'pages/PostalCodesPage'
import ProgressBarPage from 'pages/ProgressBarPage'
import RefreshButtonPage from 'pages/RefreshButtonPage'
import TableSorterPage from 'pages/TableSorterPage'
import WaitingPanelPage from 'pages/WaitingPanelPage'

import * as React from 'react'
import 'react-app-polyfill/ie11'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'
import './index.css'
import './index_highContrast.css'
import './minibootstrap.css'
import 'rc-tooltip/assets/bootstrap_white.css'
import reducer from './reducer'

const store = createStore(reducer)

if (!IS_PRODUCTION) {
  var axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/Dashboard' component={DashboardPage} />
        <Route exact path='/PDFEditor' component={PDFEditorPage} />
        <Route exact path='/Alert' component={AlertPage} />
        <Route exact path='/Banner' component={BannerPage} />
        <Route exact path='/ColorPicker' component={ColorPickerPage} />
        <Route exact path='/CountrySelect' component={CountrySelectPage} />
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
  </Provider>,
  document.getElementById('root')
)

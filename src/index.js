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
import MyLoadable from './loadable'
const DashboardPage = MyLoadable({ loader: () => import('./pages/DashboardPage') })
const PDFEditorPage = MyLoadable({ loader: () => import('./pages/PDFEditorPage') })
const AlertPage = MyLoadable({ loader: () => import('./pages/AlertPage') })
const BannerPage = MyLoadable({ loader: () => import('./pages/BannerPage') })
const ColorPickerPage = MyLoadable({ loader: () => import('./pages/ColorPickerPage') })
const CountryUtilsPage = MyLoadable({ loader: () => import('./pages/CountryUtilsPage') })
const DatePickerPage = MyLoadable({ loader: () => import('./pages/DatePickerPage') })
const FilePage = MyLoadable({ loader: () => import('./pages/FilePage') })
const FileUploadPage = MyLoadable({ loader: () => import('./pages/FileUploadPage') })
const FlagPage = MyLoadable({ loader: () => import('./pages/FlagPage') })
const IndexPage = MyLoadable({ loader: () => import('./pages/IndexPage') })
const IconsPage = MyLoadable({ loader: () => import('./pages/IconsPage') })
const ModalPage = MyLoadable({ loader: () => import('./pages/ModalPage') })
const MultipleSelectPage = MyLoadable({ loader: () => import('./pages/MultipleSelectPage') })
const NavPage = MyLoadable({ loader: () => import('./pages/NavPage') })
const PsychoPage = MyLoadable({ loader: () => import('./pages/PsychoPage') })
const RefreshButtonPage = MyLoadable({ loader: () => import('./pages/RefreshButtonPage') })
const TableSorterPage = MyLoadable({ loader: () => import('./pages/TableSorterPage') })
const WaitingPanelPage = MyLoadable({ loader: () => import('./pages/WaitingPanelPage') })

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
      <Route exact path='/Psycho' component={PsychoPage} />
      <Route exact path='/RefreshButton' component={RefreshButtonPage} />
      <Route exact path='/TableSorter' component={TableSorterPage} />
      <Route exact path='/WaitingPanel' component={WaitingPanelPage} />
      <Route path='/' component={IndexPage} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
)

/// <reference types="react" />

declare module 'eessi-pensjon-ui' {

  import PDFEditor from 'applications/PDFEditor/'
  import Dashboard from 'applications/Dashboard/Dashboard'

  import Alert from 'components/Alert/Alert'
  import Banner from 'components/Banner/Banner'
  import ColorPicker from 'components/ColorPicker/ColorPicker'
  import CountryData from 'components/CountryData/CountryData'
  import * as CountryFilter from 'components/CountrySelect/CountryFilter'
  import CountrySelect from 'components/CountrySelect/CountrySelect'
  import DatePicker from 'components/DatePicker/DatePicker'
  import ExpandingPanel from 'components/ExpandingPanel/ExpandingPanel'
  import File, { Image, Other, Pdf as PDF } from 'forhandsvisningsfil'
  import FileUpload from 'filopplasting'
  import Flag from 'components/Flag/Flag'
  import FlagList from 'components/Flag/FlagList'
  import Icons from 'components/Icons/Icons'
  import Modal from 'components/Modal/Modal'
  import MultipleSelect from 'components/MultipleSelect/MultipleSelect'
  import Pagination from 'components/Pagination/Pagination'
  import PostalCodes from 'components/PostalCodes/PostalCodes'
  import ProgressBar from 'components/ProgressBar/ProgressBar'
  import EESSIPensjonVeileder from 'components/EESSIPensjonVeileder/EESSIPensjonVeileder'
  import EESSIPensjonVeilederPanel from 'components/EESSIPensjonVeileder/EESSIPensjonVeilederPanel'
  import RefreshButton from 'components/RefreshButton/RefreshButton'
  import TableSorter from 'components/TableSorter/TableSorter'
  import WaitingPanel from 'components/WaitingPanel/WaitingPanel'
  import * as Nav from 'Nav'

  export = {
    PDFEditor,
    Dashboard,
    Alert,
    Banner,
    ColorPicker,
    CountryData,
    CountrySelect,
    CountryFilter,
    DatePicker,
    ExpandingPanel,
    File,
    Image,
    PDF,
    Other,
    FileUpload,
    Flag,
    FlagList,
    Icons,
    Modal,
    MultipleSelect,
    Pagination,
    PostalCodes,
    ProgressBar,
    EESSIPensjonVeileder,
    EESSIPensjonVeilederPanel,
    RefreshButton,
    TableSorter,
    WaitingPanel,
    Nav
  }
}

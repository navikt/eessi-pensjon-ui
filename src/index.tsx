import PDFEditor from './applications/PDFEditor/'
import Dashboard from 'nav-dashboard'
import Alert from 'components/Alert/Alert'
import Banner from 'components/Banner/Banner'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import CountryData, { CountryFilter } from 'land-verktoy'
import CountrySelect from 'landvelger'
import DatePicker from 'components/DatePicker/DatePicker'
import ExpandingPanel from 'components/ExpandingPanel/ExpandingPanel'
import File, { Image, Pdf as PDF, Other } from 'forhandsvisningsfil'
import FileUpload from 'filopplasting'
import Flag, { FlagList } from 'flagg-ikoner'
import Icons,{ availableIcons } from 'components/Icons/Icons'
import Modal from 'components/Modal/Modal'
import MultipleSelect from 'components/MultipleSelect/MultipleSelect'
import Pagination from 'paginering'
import PostalCodes from 'components/PostalCodes/PostalCodes'
import ProgressBar from 'fremdriftslinje'
import EESSIPensjonVeileder from 'components/EESSIPensjonVeileder/EESSIPensjonVeileder'
import EESSIPensjonVeilederPanel from 'components/EESSIPensjonVeileder/EESSIPensjonVeilederPanel'
import RefreshButton from 'components/RefreshButton/RefreshButton'
import TableSorter from 'tabell'
import WaitingPanel from 'components/WaitingPanel/WaitingPanel'
import * as Nav from './Nav'

export default {
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
  availableIcons,
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

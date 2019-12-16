/// <reference types="react" />

declare module 'eessi-pensjon-ui' {
  import PDFEditor, { PDFEditorProps } from 'applications/PDFEditor/'
  import Dashboard, { DashboardProps } from 'applications/Dashboard/Dashboard'
  import {
    Breakpoint,
    Config,
    Labels,
    Layout,
    Layouts,
    LayoutTab,
    LayoutTabs,
    Widget,
    WidgetMap,
    Widgets,
    WidgetTemplates
  } from 'applications/Dashboard/declarations/Dashboard'
  import Alert, { AlertProps } from 'components/Alert/Alert'
  import Banner, { BannerProps } from 'components/Banner/Banner'
  import ColorPicker, { ColorPickerProps } from 'components/ColorPicker/ColorPicker'
  import CountryData from 'components/CountryData/CountryData'
  import * as CountryFilter from 'components/CountrySelect/CountryFilter'
  import CountrySelect, { CountrySelectProps } from 'components/CountrySelect/CountrySelect'
  import DatePicker, { DatePickerProps } from 'components/DatePicker/DatePicker'
  import ExpandingPanel, { ExpandingPanelProps } from 'components/ExpandingPanel/ExpandingPanel'
  import File, { FileProps } from 'components/File/File'
  import Image from 'components/File/Image'
  import Other from 'components/File/Other'
  import PDF from 'components/File/Pdf'
  import FileUpload, { FileUploadProps } from 'components/FileUpload/FileUpload'
  import Flag, { FlagProps } from 'components/Flag/Flag'
  import FlagList, { FlagListProps } from 'components/Flag/FlagList'
  import Icons, { IconsProps } from 'components/Icons/Icons'
  import Modal, { ModalProps } from 'components/Modal/Modal'
  import MultipleSelect, { MultipleSelectProps } from 'components/MultipleSelect/MultipleSelect'
  import Pagination, { PaginationProps } from 'components/Pagination/Pagination'
  import PostalCodes from 'components/PostalCodes/PostalCodes'
  import ProgressBar, { ProgressBarProps } from 'components/ProgressBar/ProgressBar'
  import EESSIPensjonVeileder, { EESSIPensjonVeilederProps } from 'components/EESSIPensjonVeileder/EESSIPensjonVeileder'
  import EESSIPensjonVeilederPanel, { EESSIPensjonVeilederPanelProps } from 'components/EESSIPensjonVeileder/EESSIPensjonVeilederPanel'
  import RefreshButton, { RefreshButtonProps } from 'components/RefreshButton/RefreshButton'
  import TableSorter, {
    TableSorterProps,
    Column,
    Items,
    Item,
    Sort,
    SortOrder
  } from 'components/TableSorter/TableSorter'
  import WaitingPanel, { WaitingPanelProps } from 'components/WaitingPanel/WaitingPanel'
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
    Nav,
    PDFEditorProps,
    DashboardProps,
    Breakpoint,
    Config,
    Labels,
    Layout,
    Layouts,
    LayoutTab,
    LayoutTabs,
    Widget,
    WidgetMap,
    Widgets,
    WidgetTemplates,
    AlertProps,
    BannerProps,
    ColorPickerProps,
    CountrySelectProps,
    DatePickerProps,
    ExpandingPanelProps,
    FileProps,
    FileUploadProps,
    FlagProps,
    FlagListProps,
    IconsProps,
    ModalProps,
    MultipleSelectProps,
    PaginationProps,
    ProgressBarProps,
    EESSIPensjonVeilederProps,
    EESSIPensjonVeilederPanelProps,
    RefreshButtonProps,
    TableSorterProps,
    Column,
    Items,
    Item,
    Sort,
    SortOrder,
    WaitingPanelProps
  }
}

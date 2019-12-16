import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import * as icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'
import AdvarselTrekant from '../../resources/icons/advarsel-trekant'
import BubbleChat from '../../resources/icons/bubble-chat-2'
import FilledNetworkConnecting from '../../resources/icons/filled-version-network-connecting'
import FilledPaperClip from '../../resources/icons/filled-version-paperclip-2'
import FilledRemoveCircle from '../../resources/icons/filled-version-remove-circle'
import kvinne from '../../resources/icons/icon-kvinne.png'
import mann from '../../resources/icons/icon-mann.png'
import ukjent from '../../resources/icons/icon-ukjent.png'
import LineBirthdayCake from '../../resources/icons/line-version-birthday-cake'
import LineBookmarkArticle from '../../resources/icons/line-version-bookmark-article'
import LineCheckCircle from '../../resources/icons/line-version-check-circle-2'
import LineClose from '../../resources/icons/line-version-close'
import LineEcoGlobe from '../../resources/icons/line-version-eco-globe'
import LineExpandedCalendar from '../../resources/icons/line-version-expanded-calendar-3'
import LineMessageSent from '../../resources/icons/line-version-expanded-email-send-3'
import LineExpandedGlobe from '../../resources/icons/line-version-expanded-globe-2'
import LineStethoscope from '../../resources/icons/line-version-expanded-stethoscope'
import LineHandbag from '../../resources/icons/line-version-handbag-3'
import LineHeartCircle from '../../resources/icons/line-version-heart-circle'
import LineHelpCircle from '../../resources/icons/line-version-help-circle'
import LineHome from '../../resources/icons/line-version-home-3'
import LineLogout from '../../resources/icons/line-version-logout'
import LinePiggyBank from '../../resources/icons/line-version-piggy-bank'
import LineRankArmy from '../../resources/icons/line-version-rank-army-2'
import LineRemoveCircle from '../../resources/icons/line-version-remove-circle'
import ProblemCircle from '../../resources/icons/report-problem-circle'
import Tilsette from '../../resources/icons/Tilsette'
import Trashcan from '../../resources/icons/Trashcan'
import Vedlegg from '../../resources/icons/Vedlegg'

const fontAwesomeIcons: Array<string> = ['clip', 'close', 'db', 'document', 'download',
  'export', 'file', 'file-submit', 'folder', 'form', 'menu', 'print', 'plus', 'refresh', 'save', 'search', 'server',
  'settings', 'solidclose', 'tool', 'upload', 'user', 'view']

export const availableIcons: Array<string> = [
  'address', 'advarsel', 'bigclose', 'checkCircle', 'calendar', 'chat',
  'clip', 'close', 'connecting', 'db', 'document', 'download', 'export', 'file', 'file-submit', 'folder', 'form',
  'menu', 'nav-birth', 'nav-child', 'nav-close', 'nav-daily', 'nav-home', 'nav-learn', 'nav-man-icon', 'nav-message-sent',
  'nav-military', 'nav-other', 'nav-sick', 'nav-unknown-icon', 'nav-voluntary', 'nav-woman-icon', 'nav-work', 'outlink',
  'paperclip', 'print', 'plus', 'problem', 'refresh', 'removeCircle', 'save', 'server', 'settings', 'solidclose',
  'tilsette', 'tool', 'trashcan', 'upload', 'user', 'vedlegg', 'view'
]

export interface IconsProps {
  className ?: string;
  id ?: string;
  kind: string;
  onClick ?: (e: React.MouseEvent) => void;
  size?: string | number | undefined;
  style ?: any;
  title ?: string;
}

const Icons: React.FC<IconsProps> = (props: IconsProps): JSX.Element | null => {
  const { kind, size } = props
  const h: number = typeof size === 'string' ? parseInt(size, 10) : typeof size === 'number' ? size : 24
  const w: number = h
  let _size: string | number | undefined
  if (_.includes(fontAwesomeIcons, kind)) {
    _size = Math.floor(h / 15) + 'x'
  } else {
    _size = size
  }
  switch (kind) {
    case 'address' : return <LineExpandedGlobe {...props} width={w} height={h} />
    case 'advarsel' : return <AdvarselTrekant {...props} width={w} height={h} />
    case 'bigclose' : return <LineClose {...props} width={w} height={h} />
    case 'checkCircle' : return <LineCheckCircle {...props} width={w} height={h} />
    case 'calendar' : return <LineExpandedCalendar {...props} width={w} height={h} />
    case 'chat' : return <BubbleChat {...props} width={w} height={h} />
    case 'clip' : return <FontAwesomeIcon {...props} icon={icons.faPaperclip} size={_size as SizeProp} />
    case 'close' : return <FontAwesomeIcon {...props} icon={icons.faTimes} size={_size as SizeProp} />
    case 'connecting' : return <FilledNetworkConnecting {...props} width={w} height={h} />
    case 'db' : return <FontAwesomeIcon {...props} icon={icons.faDatabase} size={_size as SizeProp} />
    case 'document' : return <FontAwesomeIcon {...props} icon={icons.faFile} size={_size as SizeProp} />
    case 'download' : return <FontAwesomeIcon {...props} icon={icons.faDownload} size={_size as SizeProp} />
    case 'export' : return <FontAwesomeIcon {...props} icon={icons.faFileExport} size={_size as SizeProp} />
    case 'file' : return <FontAwesomeIcon {...props} icon={icons.faFile} size={_size as SizeProp} />
    case 'file-submit' : return <FontAwesomeIcon {...props} icon={icons.faUpload} size={_size as SizeProp} />
    case 'folder' : return <FontAwesomeIcon {...props} icon={icons.faFolderOpen} size={_size as SizeProp} />
    case 'form' : return <FontAwesomeIcon {...props} icon={icons.faBars} size={_size as SizeProp} />
    case 'menu' : return <FontAwesomeIcon {...props} icon={icons.faBars} size={_size as SizeProp} />
    case 'nav-birth' : return <LineBirthdayCake {...props} width={w} height={h} />
    case 'nav-child' : return <LineHeartCircle {...props} width={w} height={h} />
    case 'nav-close' : return <FilledRemoveCircle {...props} width={w} height={h} />
    case 'nav-daily' : return <LinePiggyBank {...props} width={w} height={h} />
    case 'nav-home' : return <LineHome {...props} width={w} height={h} />
    case 'nav-learn' : return <LineBookmarkArticle {...props} width={w} height={h} />
    case 'nav-man-icon' : return <img alt='man-icon' {...props} width={w} height={h} src={mann} />
    case 'nav-message-sent' : return <LineMessageSent {...props} width={w} height={h} />
    case 'nav-military' : return <LineRankArmy {...props} width={w} height={h} />
    case 'nav-other' : return <LineHelpCircle {...props} width={w} height={h} />
    case 'nav-sick' : return <LineStethoscope {...props} width={w} height={h} />
    case 'nav-unknown-icon' : return <img alt='ukjent-icon' {...props} width={w} height={h} src={ukjent} />
    case 'nav-voluntary' : return <LineEcoGlobe {...props} width={w} height={h} />
    case 'nav-woman-icon' : return <img alt='woman-icon' {...props} width={w} height={h} src={kvinne} />
    case 'nav-work' : return <LineHandbag {...props} width={w} height={h} />
    case 'outlink' : return <LineLogout {...props} width={w} height={h} />
    case 'paperclip' : return <FilledPaperClip {...props} width={w} height={h} />
    case 'print' : return <FontAwesomeIcon {...props} icon={icons.faPrint} size={_size as SizeProp} />
    case 'plus' : return <FontAwesomeIcon {...props} icon={icons.faPlus} size={_size as SizeProp} />
    case 'problem' : return <ProblemCircle {...props} width={w} height={h} />
    case 'refresh' : return <FontAwesomeIcon {...props} icon={icons.faSyncAlt} size={_size as SizeProp} />
    case 'removeCircle' : return <LineRemoveCircle {...props} width={w} height={h} />
    case 'save' : return <FontAwesomeIcon {...props} icon={icons.faSave} size={_size as SizeProp} />
    case 'search' : return <FontAwesomeIcon {...props} icon={icons.faSearch} size={_size as SizeProp} />
    case 'server' : return <FontAwesomeIcon {...props} icon={icons.faServer} size={_size as SizeProp} />
    case 'settings' : return <FontAwesomeIcon {...props} icon={icons.faCog} size={_size as SizeProp} />
    case 'solidclose' : return <FontAwesomeIcon {...props} icon={icons.faTimesCircle} size={_size as SizeProp} />
    case 'tilsette' : return <Tilsette {...props} width={w} height={h} />
    case 'tool' : return <FontAwesomeIcon {...props} icon={icons.faWrench} size={_size as SizeProp} />
    case 'trashcan' : return <Trashcan {...props} width={w} height={h} />
    case 'upload' : return <FontAwesomeIcon {...props} icon={icons.faUpload} size={_size as SizeProp} />
    case 'user' : return <FontAwesomeIcon {...props} icon={icons.faUser} size={_size as SizeProp} />
    case 'vedlegg' : return <Vedlegg {...props} width={w} height={h} />
    case 'view' : return <FontAwesomeIcon {...props} icon={icons.faEye} size={_size as SizeProp} />
    default: return null
  }
}

Icons.propTypes = {
  kind: PT.string.isRequired,
  size: PT.oneOfType([PT.string, PT.number])
}
Icons.displayName = 'Icons'
export default Icons

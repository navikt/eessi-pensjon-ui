import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import AdvarselTrekant from '../../resources/icons/advarsel-trekant.svg'
import BubbleChat from '../../resources/icons/bubble-chat-2.svg'
import FilledNetworkConnecting from '../../resources/icons/filled-version-network-connecting.svg'
import FilledPaperClip from '../../resources/icons/filled-version-paperclip-2.svg'
import FilledRemoveCircle from '../../resources/icons/filled-version-remove-circle.svg'
import LineBirthdayCake from '../../resources/icons/line-version-birthday-cake.svg'
import LineBookmarkArticle from '../../resources/icons/line-version-bookmark-article.svg'
import LineCheckCircle from '../../resources/icons/line-version-check-circle-2.svg'
import LineClose from '../../resources/icons/line-version-close.svg'
import LineEcoGlobe from '../../resources/icons/line-version-eco-globe.svg'
import LineExpandedCalendar from '../../resources/icons/line-version-expanded-calendar-3.svg'
import LineExpandedGlobe from '../../resources/icons/line-version-expanded-globe-2.svg'
import LineHandbag from '../../resources/icons/line-version-handbag-3.svg'
import LineHeartCircle from '../../resources/icons/line-version-heart-circle.svg'
import LineHelpCircle from '../../resources/icons/line-version-help-circle.svg'
import LineLogout from '../../resources/icons/line-version-logout.svg'
import LineHome from '../../resources/icons/line-version-home-3.svg'
import LineMessageSent from '../../resources/icons/line-version-expanded-email-send-3.svg'
import LinePiggyBank from '../../resources/icons/line-version-piggy-bank.svg'
import LineRankArmy from '../../resources/icons/line-version-rank-army-2.svg'
import LineRemoveCircle from '../../resources/icons/line-version-remove-circle.svg'
import LineStethoscope from '../../resources/icons/line-version-expanded-stethoscope.svg'
import ProblemCircle from '../../resources/icons/report-problem-circle.svg'
import Vedlegg from '../../resources/icons/Vedlegg'
import Trashcan from '../../resources/icons/Trashcan'
import Tilsette from '../../resources/icons/Tilsette'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

const fontAwesomeIcons = ['caretLeft', 'caretRight', 'back', 'next', 'clip', 'close', 'db', 'document', 'download',
  'export', 'file', 'file-submit', 'folder', 'form', 'menu', 'print', 'plus', 'refresh', 'save', 'settings', 'solidclose',
  'tool', 'upload', 'user', 'view']

export const availableIcons = [
  'address', 'advarsel', 'bigclose', 'caretLeft', 'back', 'caretRight', 'next', 'checkCircle', 'calendar', 'chat',
  'clip', 'close', 'connecting', 'db', 'document', 'download', 'export', 'file', 'file-submit', 'folder', 'form',
  'menu', 'nav-birth', 'nav-child', 'nav-close', 'nav-daily', 'nav-home', 'nav-learn', 'nav-man-icon', 'nav-message-sent',
  'nav-military', 'nav-other', 'nav-sick', 'nav-unknown-icon', 'nav-voluntary', 'nav-woman-icon', 'nav-work', 'outlink',
  'paperclip', 'print', 'plus', 'problem', 'refresh', 'removeCircle', 'save', 'server', 'settings', 'solidclose',
  'tilsette', 'tool', 'trashcan', 'upload', 'user', 'vedlegg', 'view'
]

const Icons = (props) => {
  const { kind, size } = props
  const h = parseInt(size, 10) || 24
  const w = h
  let _size
  if (_.includes(fontAwesomeIcons, kind)) {
    _size = _.isNumber(size) ? (Math.floor(size / 15)) + 'x' : size
  } else {
    _size = size
  }

  switch (kind) {
    case 'address' : return <LineExpandedGlobe {...props} width={w} height={h} />
    case 'advarsel' : return <AdvarselTrekant {...props} width={w} height={h} />
    case 'bigclose' : return <LineClose {...props} width={w} height={h} />
    case 'caretLeft' : case 'back' : return <FontAwesomeIcon {...props} icon={icons.faCaretLeft} size={_size} />
    case 'caretRight' : case 'next' : return <FontAwesomeIcon {...props} icon={icons.faCaretRight} size={_size} />
    case 'checkCircle' : return <LineCheckCircle {...props} width={w} height={h} />
    case 'calendar' : return <LineExpandedCalendar {...props} width={w} height={h} />
    case 'chat' : return <BubbleChat {...props} width={w} height={h} />
    case 'clip' : return <FontAwesomeIcon {...props} icon={icons.faPaperclip} size={_size} />
    case 'close' : return <FontAwesomeIcon {...props} icon={icons.faTimes} size={_size} />
    case 'connecting' : return <FilledNetworkConnecting {...props} width={w} height={h} />
    case 'db' : return <FontAwesomeIcon {...props} icon={icons.faDatabase} size={_size} />
    case 'document' : return <FontAwesomeIcon {...props} icon={icons.faFile} size={_size} />
    case 'download' : return <FontAwesomeIcon {...props} icon={icons.faDownload} size={_size} />
    case 'export' : return <FontAwesomeIcon {...props} icon={icons.faFileExport} size={_size} />
    case 'file' : return <FontAwesomeIcon {...props} icon={icons.faFile} size={_size} />
    case 'file-submit' : return <FontAwesomeIcon {...props} icon={icons.faUpload} size={_size} />
    case 'folder' : return <FontAwesomeIcon {...props} icon={icons.faFolderOpen} size={_size} />
    case 'form' : return <FontAwesomeIcon {...props} icon={icons.faBars} size={_size} />
    case 'menu' : return <FontAwesomeIcon {...props} icon={icons.faBars} size={_size} />
    case 'nav-birth' : return <LineBirthdayCake {...props} width={w} height={h} />
    case 'nav-child' : return <LineHeartCircle {...props} width={w} height={h} />
    case 'nav-close' : return <FilledRemoveCircle {...props} width={w} height={h} />
    case 'nav-daily' : return <LinePiggyBank {...props} width={w} height={h} />
    case 'nav-home' : return <LineHome {...props} width={w} height={h} />
    case 'nav-learn' : return <LineBookmarkArticle {...props} width={w} height={h} />
    case 'nav-man-icon' : return <img alt='man-icon' {...props} width={w} height={h} src={require('../../resources/icons/icon-mann.png')} />
    case 'nav-message-sent' : return <LineMessageSent {...props} width={w} height={h} />
    case 'nav-military' : return <LineRankArmy {...props} width={w} height={h} />
    case 'nav-other' : return <LineHelpCircle {...props} width={w} height={h} />
    case 'nav-sick' : return <LineStethoscope {...props} width={w} height={h} />
    case 'nav-unknown-icon' : return <img alt='ukjent-icon' {...props} width={w} height={h} src={require('../../resources/icons/icon-ukjent.png')} />
    case 'nav-voluntary' : return <LineEcoGlobe {...props} width={w} height={h} />
    case 'nav-woman-icon' : return <img alt='woman-icon' {...props} width={w} height={h} src={require('../../resources/icons/icon-kvinne.png')} />
    case 'nav-work' : return <LineHandbag {...props} width={w} height={h} />
    case 'outlink' : return <LineLogout {...props} width={w} height={h} />
    case 'paperclip' : return <FilledPaperClip {...props} width={w} height={h} />
    case 'print' : return <FontAwesomeIcon {...props} icon={icons.faPrint} size={_size} />
    case 'plus' : return <FontAwesomeIcon {...props} icon={icons.faPlus} size={_size} />
    case 'problem' : return <ProblemCircle {...props} width={w} height={h} />
    case 'refresh' : return <FontAwesomeIcon {...props} icon={icons.faSyncAlt} size={_size} />
    case 'removeCircle' : return <LineRemoveCircle {...props} width={w} height={h} />
    case 'save' : return <FontAwesomeIcon {...props} icon={icons.faSave} size={_size} />
    case 'server' : return <FontAwesomeIcon {...props} icon={icons.faServer} width={w} height={h} size='3x' />
    case 'settings' : return <FontAwesomeIcon {...props} icon={icons.faCog} size={_size} />
    case 'solidclose' : return <FontAwesomeIcon {...props} icon={icons.faTimesCircle} size={_size} />
    case 'tilsette' : return <Tilsette {...props} width={w} height={h} />
    case 'tool' : return <FontAwesomeIcon {...props} icon={icons.faWrench} size={_size} />
    case 'trashcan' : return <Trashcan {...props} width={w} height={h} />
    case 'upload' : return <FontAwesomeIcon {...props} icon={icons.faUpload} size={_size} />
    case 'user' : return <FontAwesomeIcon {...props} icon={icons.faUser} size={_size} />
    case 'vedlegg' : return <Vedlegg {...props} width={w} height={h} />
    case 'view' : return <FontAwesomeIcon {...props} icon={icons.faEye} size={_size} />
    default: return null
  }
}

Icons.propTypes = {
  kind: PT.string.isRequired,
  size: PT.oneOfType([PT.string, PT.number])
}
Icons.displayName = 'Icons'
export default Icons

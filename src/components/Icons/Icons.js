import React from 'react'
import PT from 'prop-types'

import AdvarselTrekant from '../../resources/images/advarsel-trekant.svg'
import BubbleChat from '../../resources/images/bubble-chat-2.svg'
import FilledNetworkConnecting from '../../resources/images/filled-version-network-connecting.svg'
import FilledPaperClip from '../../resources/images/filled-version-paperclip-2.svg'
import FilledRemoveCircle from '../../resources/images/filled-version-remove-circle.svg'
import LineBirthdayCake from '../../resources/images/line-version-birthday-cake.svg'
import LineBookmarkArticle from '../../resources/images/line-version-bookmark-article.svg'
import LineCheckCircle from '../../resources/images/line-version-check-circle-2.svg'
import LineClose from '../../resources/images/line-version-close.svg'
import LineEcoGlobe from '../../resources/images/line-version-eco-globe.svg'
import LineExpandedCalendar from '../../resources/images/line-version-expanded-calendar-3.svg'
import LineExpandedGlobe from '../../resources/images/line-version-expanded-globe-2.svg'
import LineHandbag from '../../resources/images/line-version-handbag-3.svg'
import LineHeartCircle from '../../resources/images/line-version-heart-circle.svg'
import LineHelpCircle from '../../resources/images/line-version-help-circle.svg'
import LineLogout from '../../resources/images/line-version-logout.svg'
import LineHome from '../../resources/images/line-version-home-3.svg'
import LineMessageSent from '../../resources/images/line-version-expanded-email-send-3.svg'
import LinePiggyBank from '../../resources/images/line-version-piggy-bank.svg'
import LineRankArmy from '../../resources/images/line-version-rank-army-2.svg'
import LineRemoveCircle from '../../resources/images/line-version-remove-circle.svg'
import LineStethoscope from '../../resources/images/line-version-expanded-stethoscope.svg'
import ProblemCircle from '../../resources/images/report-problem-circle.svg'

import Vedlegg from '../../resources/images/Vedlegg'
import Trashcan from '../../resources/images/Trashcan'
import Tilsette from '../../resources/images/Tilsette'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

const Icons = (props) => {
  const { kind, size } = props
  const h = parseInt(size, 10) || 24
  const w = h

  switch (kind) {
    case 'address' : return <LineExpandedGlobe {...props} width={w} height={h} />
    case 'advarsel' : return <AdvarselTrekant {...props} width={w} height={h} />
    case 'bigclose' : return <LineClose {...props} width={w} height={h} />
    case 'caretLeft' : case 'back' : return <FontAwesomeIcon icon={icons.faCaretLeft} {...props} />
    case 'caretRight' : case 'next' : return <FontAwesomeIcon icon={icons.faCaretRight} {...props} />
    case 'checkCircle' : return <LineCheckCircle {...props} width={w} height={h} />
    case 'calendar' : return <LineExpandedCalendar {...props} width={w} height={h} />
    case 'chat' : return <BubbleChat {...props} width={w} height={h} />
    case 'clip' : return <FontAwesomeIcon icon={icons.faPaperclip} {...props} />
    case 'close' : return <FontAwesomeIcon icon={icons.faTimes} {...props} />
    case 'connecting' : return <FilledNetworkConnecting {...props} width={w} height={h} />
    case 'db' : return <FontAwesomeIcon icon={icons.faDatabase} {...props} />
    case 'document' : return <FontAwesomeIcon icon={icons.faFile} {...props} />
    case 'download' : return <FontAwesomeIcon icon={icons.faDownload} {...props} />
    case 'export' : return <FontAwesomeIcon icon={icons.faFileExport} {...props} />
    case 'file' : return <FontAwesomeIcon icon={icons.faFile} {...props} />
    case 'file-submit' : return <FontAwesomeIcon icon={icons.faUpload} {...props} />
    case 'folder' : return <FontAwesomeIcon icon={icons.faFolderOpen} {...props} />
    case 'form' : return <FontAwesomeIcon icon={icons.faBars} {...props} />
    case 'menu' : return <FontAwesomeIcon icon={icons.faBars} {...props} />
    case 'nav-birth' : return <LineBirthdayCake {...props} width={w} height={h} />
    case 'nav-child' : return <LineHeartCircle {...props} width={w} height={h} />
    case 'nav-close' : return <FilledRemoveCircle {...props} />
    case 'nav-daily' : return <LinePiggyBank {...props} width={w} height={h} />
    case 'nav-home' : return <LineHome {...props} width={w} height={h} />
    case 'nav-learn' : return <LineBookmarkArticle {...props} width={w} height={h} />
    case 'nav-man-icon' : return <img alt='man-icon' width={w} height={h} src={require('../../resources/images/icon-mann.png')} {...props} />
    case 'nav-message-sent' : return <LineMessageSent {...props} />
    case 'nav-military' : return <LineRankArmy {...props} width={w} height={h} />
    case 'nav-other' : return <LineHelpCircle {...props} width={w} height={h} />
    case 'nav-sick' : return <LineStethoscope {...props} width={w} height={h} />
    case 'nav-unknown-icon' : return <img alt='ukjent-icon' width={w} height={h} src={require('../../resources/images/icon-ukjent.png')} {...props} />
    case 'nav-voluntary' : return <LineEcoGlobe {...props} width={w} height={h} />
    case 'nav-woman-icon' : return <img alt='woman-icon' width={w} height={h} src={require('../../resources/images/icon-kvinne.png')} {...props} />
    case 'nav-work' : return <LineHandbag {...props} width={w} height={h} />
    case 'outlink' : return <LineLogout {...props} width={w} height={h} />
    case 'paperclip' : return <FilledPaperClip {...props} width={w} height={h} />
    case 'print' : return <FontAwesomeIcon icon={icons.faPrint} {...props} />
    case 'plus' : return <FontAwesomeIcon icon={icons.faPlus} {...props} />
    case 'problem' : return <ProblemCircle {...props} width={w} height={h} />
    case 'refresh' : return <FontAwesomeIcon icon={icons.faSyncAlt} {...props} />
    case 'removeCircle' : return <LineRemoveCircle {...props} width={w} height={h} />
    case 'save' : return <FontAwesomeIcon icon={icons.faSave} {...props} />
    case 'server' : return <FontAwesomeIcon icon={icons.faServer} {...props} />
    case 'settings' : return <FontAwesomeIcon icon={icons.faCog} {...props} />
    case 'solidclose' : return <FontAwesomeIcon icon={icons.faTimesCircle} {...props} />
    case 'tilsette' : return <Tilsette {...props} width={w} height={h} />
    case 'tool' : return <FontAwesomeIcon icon={icons.faWrench} {...props} />
    case 'trashcan' : return <Trashcan {...props} width={w} height={h} />
    case 'upload' : return <FontAwesomeIcon icon={icons.faUpload} {...props} />
    case 'user' : return <FontAwesomeIcon icon={icons.faUser} {...props} />
    case 'vedlegg' : return <Vedlegg {...props} width={w} height={h} />
    case 'view' : return <FontAwesomeIcon icon={icons.faEye} {...props} />
    default: return null
  }
}

Icons.propTypes = {
  kind: PT.string.isRequired,
  size: PT.oneOfType([PT.string, PT.number])
}
Icons.displayName = 'Icons'
export default Icons

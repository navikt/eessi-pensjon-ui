import React from 'react'
import PT from 'prop-types'

import BookmarkArticleSVG from '../../resources/images/LineVersionBookmarkArticle.js'
import HomeSVG from '../../resources/images/LineVersionHome3.js'
import HandbagSVG from '../../resources/images/LineVersionHandbag3.js'
import RankArmySVG from '../../resources/images/LineVersionRankArmy2.js'
import RemoveCircleSVG from '../../resources/images/FilledVersionRemoveCircle.js'
import MessageSentSVG from '../../resources/images/LineVersionExpandedEmailSend3.js'

import ProblemCircle from '../../resources/images/report-problem-circle.svg'
import BubbleChat from '../../resources/images/bubble-chat-2.svg'
import PaperClip from '../../resources/images/filled-version-paperclip-2.svg'
import CheckCircle from '../../resources/images/line-version-check-circle-2.svg'
import RemoveCircle from '../../resources/images/line-version-remove-circle.svg'
import HeartSVG from '../../resources/images/line-version-heart-circle.svg'
import EcoglobeSVG from '../../resources/images/line-version-eco-globe.svg'
import StethoscopeSVG from '../../resources/images/line-version-expanded-stethoscope.svg'
import BirthdaycakeSVG from '../../resources/images/line-version-birthday-cake.svg'
import HelpcircleSVG from '../../resources/images/line-version-help-circle.svg'
import PiggybankSVG from '../../resources/images/line-version-piggy-bank.svg'
import NetworkConnectingSVG from '../../resources/images/filled-version-network-connecting.svg'
import Calendar from '../../resources/images/line-version-expanded-calendar-3.svg'
import Globe from '../../resources/images/line-version-expanded-globe-2.svg'

import Vedlegg from '../../resources/images/Vedlegg'
import Trashcan from '../../resources/images/Trashcan'
import Tilsette from '../../resources/images/Tilsette'
import LineVersionClose from '../../resources/images/LineVersionClose'
import LineVersionLogout from '../../resources/images/LineVersionLogout'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

const Icons = (props) => {
  const { kind, size } = props
  const h = parseInt(size, 10) || 24
  const w = h

  switch (kind) {
    case 'nav-work' : return <HandbagSVG {...props} width={w} height={h} />
    case 'nav-home' : return <HomeSVG {...props} width={w} height={h} />
    case 'nav-military' : return <RankArmySVG {...props} width={w} height={h} />
    case 'nav-learn' : return <BookmarkArticleSVG {...props} width={w} height={h} />
    case 'nav-child' : return <HeartSVG {...props} width={w} height={h} />
    case 'nav-voluntary' : return <EcoglobeSVG {...props} width={w} height={h} />
    case 'nav-birth' : return <BirthdaycakeSVG {...props} width={w} height={h} />
    case 'nav-daily' : return <PiggybankSVG {...props} width={w} height={h} />
    case 'nav-sick' : return <StethoscopeSVG {...props} width={w} height={h} />
    case 'nav-other' : return <HelpcircleSVG {...props} width={w} height={h} />

    case 'nav-close' : return <RemoveCircleSVG {...props} />
    case 'nav-message-sent' : return <MessageSentSVG {...props} />
    case 'nav-man-icon' : return <img alt='man-icon' width={w} height={h} src={require('../../resources/images/mann.png')} {...props} />
    case 'nav-unknown-icon' : return <img alt='ukjent-icon' width={w} height={h} src={require('../../resources/images/ukjent.png')} {...props} />
    case 'nav-woman-icon' : return <img alt='woman-icon' width={w} height={h} src={require('../../resources/images/kvinne.png')} {...props} />

    case 'document' : return <FontAwesomeIcon icon={icons.faFile} {...props} />
    case 'view' : return <FontAwesomeIcon icon={icons.faEye} {...props} />
    case 'user' : return <FontAwesomeIcon icon={icons.faUser} {...props} />
    case 'file' : return <FontAwesomeIcon icon={icons.faFile} {...props} />
    case 'print' : return <FontAwesomeIcon icon={icons.faPrint} {...props} />
    case 'folder' : return <FontAwesomeIcon icon={icons.faFolderOpen} {...props} />
    case 'save' : return <FontAwesomeIcon icon={icons.faSave} {...props} />
    case 'export' : return <FontAwesomeIcon icon={icons.faFileExport} {...props} />
    case 'file-submit' : return <FontAwesomeIcon icon={icons.faUpload} {...props} />
    case 'menu' : return <FontAwesomeIcon icon={icons.faBars} {...props} />
    case 'clip' : return <FontAwesomeIcon icon={icons.faPaperclip} {...props} />
    case 'refresh' : return <FontAwesomeIcon icon={icons.faSyncAlt} {...props} />
    case 'form' : return <FontAwesomeIcon icon={icons.faBars} {...props} />
    case 'tool' : return <FontAwesomeIcon icon={icons.faWrench} {...props} />
    case 'plus' : return <FontAwesomeIcon icon={icons.faPlus} {...props} />
    case 'download' : return <FontAwesomeIcon icon={icons.faDownload} {...props} />
    case 'upload' : return <FontAwesomeIcon icon={icons.faUpload} {...props} />
    case 'caretLeft' : case 'back' : return <FontAwesomeIcon icon={icons.faCaretLeft} {...props} />
    case 'caretRight' : case 'next' : return <FontAwesomeIcon icon={icons.faCaretRight} {...props} />
    case 'server' : return <FontAwesomeIcon icon={icons.faServer} {...props} />
    case 'db' : return <FontAwesomeIcon icon={icons.faDatabase} {...props} />
    case 'solidclose' : return <FontAwesomeIcon icon={icons.faTimesCircle} {...props} />
    case 'close' : return <FontAwesomeIcon icon={icons.faTimes} {...props} />
    case 'settings' : return <FontAwesomeIcon icon={icons.faCog} {...props} />

    case 'paperclip' : return <PaperClip {...props} width={w} height={h} />
    case 'checkCircle' : return <CheckCircle {...props} width={w} height={h} />
    case 'removeCircle' : return <RemoveCircle {...props} width={w} height={h} />
    case 'connecting' : return <NetworkConnectingSVG {...props} width={w} height={h} />
    case 'bigclose' : return <LineVersionClose {...props} width={w} height={h} />
    case 'vedlegg' : return <Vedlegg {...props} width={w} height={h} />
    case 'trashcan' : return <Trashcan {...props} width={w} height={h} />
    case 'tilsette' : return <Tilsette {...props} width={w} height={h} />
    case 'outlink' : return <LineVersionLogout {...props} width={w} height={h} />
    case 'problem' : return <ProblemCircle {...props} width={w} height={h} />
    case 'chat' : return <BubbleChat {...props} width={w} height={h} />
    case 'address' : return <Globe {...props} width={w} height={h} />
    case 'calendar' : return <Calendar {...props} width={w} height={h} />

    default: return null
  }
}

Icons.propTypes = {
  kind: PT.string.isRequired,
  size: PT.oneOfType([PT.string, PT.number])
}
Icons.displayName = 'Icons'
export default Icons

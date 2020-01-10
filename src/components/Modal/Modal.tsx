import classNames from 'classnames'
import _ from 'lodash'
import { Hovedknapp, Knapp, Lukknapp, Modal as NavModal, Undertittel } from 'Nav'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import './Modal.css'

export interface ModalButton {
  onClick?: () => void;
  disabled ?: boolean;
  main?: boolean;
  text: string;
}

export interface ModalContent {
  modalTitle?: string;
  modalContent ?: JSX.Element |string;
  modalText ?: string;
  modalButtons?: Array<ModalButton>
}

export const ModalContentPropType = PT.shape({
  modalTitle: PT.string,
  modalContent: PT.oneOf([PT.element, PT.string]),
  modalText: PT.string,
  modalButtons: PT.arrayOf(PT.shape({
    onClick: PT.func,
    disabled: PT.bool,
    main: PT.bool,
    text: PT.string.isRequired
  }))
})

export interface ModalProps {
  appElement?: Element;
  className?: string;
  onModalClose?: () => void;
  closeButton?: boolean;
  closeButtonLabel?: string;
  modal?: ModalContent | undefined;
}

export const Modal: React.FC<ModalProps> = ({
  appElement = document.body, className, onModalClose, closeButton = true, closeButtonLabel = '', modal
}: ModalProps): JSX.Element => {
  const [_modal, setModal] = useState(modal)

  useEffect(() => {
    if (!_.isEqual(_modal, modal)) {
      setModal(modal)
    }
  }, [modal, _modal])

  const closeModal = (): void => {
    if (_.isFunction(onModalClose)) {
      onModalClose()
    }
  }

  const onCloseButtonClicked = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    if (_.isFunction(onModalClose)) {
      onModalClose()
    }
  }

  NavModal.setAppElement(appElement)

  return (
    <NavModal
      className={classNames('c-modal', className)}
      isOpen={!_(_modal).isNil()}
      onRequestClose={closeModal}
      closeButton={false}
      contentLabel='contentLabel'
    >
      {_modal ? (
        <div>
          {closeButton ? (
            <Lukknapp
              className='c-modal__close-button'
              onClick={onCloseButtonClicked}
            >
              {closeButtonLabel}
            </Lukknapp>
          ) : null}
          {_modal.modalTitle
            ? (
              <Undertittel className='m-3 c-modal__title'>{_modal.modalTitle}</Undertittel>
            ) : null}
          {_modal.modalContent || (
            <div className='c-modal__text m-4 text-center'>
              {_modal.modalText}
            </div>
          )}
          {_modal.modalButtons
            ? (
              <div className='c-modal__buttons text-center'>
                {_modal.modalButtons.map(button => {
                  const handleClick = _.isFunction(button.onClick) ? () => {
                    button.onClick!()
                    closeModal()
                  } : closeModal
                  return button.main
                    ? (
                      <Hovedknapp
                        id='c-modal__main-button-id'
                        disabled={button.disabled || false}
                        className='c-modal__main-button mr-3 mb-3'
                        key={button.text}
                        onClick={handleClick}
                      >
                        {button.text}
                      </Hovedknapp>
                    )
                    : (
                      <Knapp
                        id='c-modal__other-button-id'
                        className='c-modal__other-button mr-3 mb-3'
                        key={button.text}
                        onClick={handleClick}
                      >
                        {button.text}
                      </Knapp>
                    )
                })}
              </div>
            ) : null}
        </div>
      ) : null}
    </NavModal>
  )
}

Modal.propTypes = {
  appElement: PT.any,
  className: PT.string,
  closeButton: PT.bool,
  closeButtonLabel: PT.string,
  onModalClose: PT.func,
  modal: ModalContentPropType
}
Modal.displayName = 'Modal'
export default Modal

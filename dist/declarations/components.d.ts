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
  modalButtons?: Array<ModalButton>;
  closeButton?: boolean;
}

export interface FlagItem {
  label: string;
  country: string;
}

export type FlagItems = Array<FlagItem>

import PT from 'prop-types'

export const ActionCreatorPropType = PT.func
export const ActionCreatorsPropType = PT.objectOf(ActionCreatorPropType.isRequired)
export const LabelsPropType = PT.objectOf(PT.string.isRequired)

export const FilePropType = PT.shape({
  id: PT.string,
  size: PT.number.isRequired,
  name: PT.string.isRequired,
  numPages: PT.number,
  mimetype: PT.string.isRequired,
  content: PT.shape({
    text: PT.string,
    base64: PT.string
  }).isRequired
})

export const FilesPropType = PT.arrayOf(FilePropType.isRequired)

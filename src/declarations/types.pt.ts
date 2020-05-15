import PT from 'prop-types'

export const ActionCreatorPropType = PT.func
export const ActionCreatorsPropType = PT.objectOf(ActionCreatorPropType.isRequired)
export const LabelsPropType = PT.objectOf(PT.string.isRequired)

export default process.env.NODE_ENV
export const IS_DEVELOPMENT_WITH_NO_AUTH = process.env.NODE_ENV === 'developmentNoAuth'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_TEST = process.env.NODE_ENV === 'test'
import { AUTH_TOKEN_STRING } from './constants.js'

export const isSignedIn = () => {
  return localStorage.getItem(AUTH_TOKEN_STRING)
}

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_STRING)
}

export const setAuthToken = (authToken) => {
  localStorage.setItem(AUTH_TOKEN_STRING, authToken)
}
export const deleteAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_STRING)
}

export const showSnackBar = (variant, message, props) => {
  props.enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  })
}
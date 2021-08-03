import { AUTH_TOKEN_STRING } from './constants.js'

/**
 * Returns true if user is signed in.
 */
export const isSignedIn = () => {
  return localStorage.getItem(AUTH_TOKEN_STRING) ? true: false
}

/**
 * Gets authentication token from browser.
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_STRING)
}

/**
 * Stores a jwt authentication token in the browser.
 * 
 * @param {string} authToken - The jwt authenication token to be stored in the browser.
 */
export const setAuthToken = (authToken) => {
  localStorage.setItem(AUTH_TOKEN_STRING, authToken)
}

/**
 * Deletes the jwt authentication token from the browser.
 */
export const deleteAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_STRING)
}

/**
 * Shows a snackbar with a message to the user.
 * 
 * @param {string} variant - The variant och the snackbar.
 * @param {string} message - The message that the snackbar will show.
 * @param {object} props - The props object of the component that will show the snackbar.
 */
export const showSnackBar = (variant, message, props) => {
  props.enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  })
}
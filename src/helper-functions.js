export const isSignedIn = () => {
  return localStorage.getItem('authToken')
}

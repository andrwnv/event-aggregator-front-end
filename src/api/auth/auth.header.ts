export const authHeader = () => {
  const jwt = localStorage.getItem('api-key')
  return {
    Authorization: `Bearer ${jwt ? jwt : ''}`,
  }
}

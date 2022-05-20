export const authHeader = () => {
    const jwt = localStorage.getItem('custom-roures-key');
    return {
        Authorization: `Bearer ${jwt ? jwt : ''}`
    }
}

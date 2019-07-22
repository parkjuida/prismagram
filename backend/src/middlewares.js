export const isAuthenticated = (request) => {
    if (!request.user) {
        throw Error('need log in...')
    }
    return
}


export const getCurrentUser = () => {
    const user = {
        user : JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token')
    }

    return user.user && user;
}
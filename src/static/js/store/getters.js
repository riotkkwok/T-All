export const loginInfo = (state) => {
    const user = state.userInfo;
    return {
        userName: user.userName,
        userId: user.userId
    }
}

export const showLoginPanel = (state) => {
    return state.showLoginPanel;
}
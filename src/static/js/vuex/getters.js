const getters = {
    loginInfo: state => {
        const user = state.userInfo;
        return {
            userName: user.userName,
            userId: user.userId
        };
    }
};

module.exports = getters;
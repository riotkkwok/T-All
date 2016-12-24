export const loginInfo = (state) => {
    const user = state.userInfo;
    return {
        userName: user.userName,
        userId: user.userId,
        adminId: user.adminId
    }
}

export const isLogined = (state) => {
    return !!loginInfo.userId;
}

export const isAdmin = (state) => {
    return !!loginInfo.adminId;
}

export const showLoginPanel = (state) => {
    return state.showLoginPanel;
}

export const taskList = (state) => {
    return state.taskList;
}

export const startDate = (state) => {
    return state.startDate;
}

export const nowDate = (state) => {
    return state.nowDate;
}

export const endDate = (state) => {
    const y = state.nowDate ? 
        state.nowDate.getFullYear() : state.startDate ? 
        state.startDate.getFullYear() : (new Date()).getFullYear();
    return new Date(y+'/12/31');
}

export const holidayList = (state) => {
    return state.holidayList;
}

export const assigneeList = (state) => {
    return state.assigneeList;
}

export const showDetails = (state) => {
    return state.showDetails;
}

export const detailedTask = (state) => {
    return state.detailedTask;
}
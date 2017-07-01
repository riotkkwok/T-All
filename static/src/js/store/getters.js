import * as myUtil from 'myUtil'

export const mode = (state) => {
    return state.mode;
}

export const loginInfo = (state) => {
    const user = state.userInfo;
    return {
        userName: user.userName,
        userId: user.userId,
        adminId: user.adminId
    }
}

export const isLogined = (state) => {
    return !!loginInfo(state) && !!loginInfo(state).userId;
}

export const isAdmin = (state) => {
    return !!loginInfo(state).adminId;
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
    return state.endDate;
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
    return myUtil.clone(state.detailedTask);
}

export const editTask = (state) => {
    return myUtil.clone(state.editTask);
}

export const showEditingToast = (state) => {
    return state.showEditingToast;
}

export const showAddTaskDialog = (state) => {
    return state.showAddTaskDialog;
}

export const toUpdateTable = (state) => {
    return state.toUpdateTable;
}

export const leaveTaker = (state) => {
    return state.leaveTaker;
}
import * as myUtil from 'myUtil'

export const mode = (state, val) => {
    state.mode = val;
}

export const showLoginPanel = (state, val) => {
    state.showLoginPanel = !!val;
}

export const showDetails = (state, val) => {
    state.showDetails = !!val;
}

export const detailedTask = (state, obj) => {
    state.detailedTask = myUtil.clone(obj);
}

export const editTask = (state, obj) => {
    state.editTask = myUtil.clone(obj);
}

export const showEditingToast = (state, val) => {
    state.showEditingToast = !!val;
}

export const showAddTaskDialog = (state, val) => {
    state.showAddTaskDialog = !!val;
}

export const userInfo = (state, obj) => {
    state.userInfo = myUtil.clone(obj);
}

export const dateInfo = (state, obj) => {
    state.startDate = new Date(obj.startDate);
    state.nowDate = new Date(obj.nowDate);
    if(!!obj.endDate){
        state.endDate = new Date(obj.endDate);
    }else{
        const y = state.nowDate ? 
            state.nowDate.getFullYear() : state.startDate ? 
            state.startDate.getFullYear() : (new Date()).getFullYear();
        state.endDate = new Date(y+'/12/31');
    }
}

export const assigneeList = (state, obj) => {
    state.assigneeList = myUtil.clone(obj);
}

export const taskList = (state, obj) => {
    state.taskList = myUtil.clone(obj);
}

export const toUpdateTable = (state, val) => {
    state.toUpdateTable = !!val;
}

export const toUpdateHead = (state, val) => {
    state.toUpdateHead = !!val;
}

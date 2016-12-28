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
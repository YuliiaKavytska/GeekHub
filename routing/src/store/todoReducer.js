import {createSlice} from '@reduxjs/toolkit'

export const toDoSlice = createSlice({
    name: 'list',
    initialState: localStorage['todo']
        ? JSON.parse(localStorage['todo']).toDo
        : {
            list: [
                {id: 1, task: 'state.lastTask', status: 'active', editing: false},
                {id: 2, task: 'sdfgsdfg', status: 'completed', editing: false},
                {id: 3, task: 'sdfgsdfg', status: 'completed', editing: false},
            ],
            lastTask: '',
            countOfActiveTasks: 0,
            filter: 'all',
            filterResult: []
        },
    reducers: {
        changeItemStatus: (state, action) => {
            let element = state.list.findIndex(e => e.id === action.payload.id);
            state.list[element].status === 'active'
                ? state.list[element].status = 'completed'
                : state.list[element].status = 'active';
            state.countOfActiveTasks = state.list.filter(e => e.status === 'active').length;
            state.filterResult = state.list;
            state.filter = 'all';
        },
        changeEditing: (state, action) => {
            let element = state.list.findIndex(e => e.id === action.payload.id);
            action.payload.case === false
                ? state.list[element].editing = false
                : state.list[element].editing = !state.list[element].editing;
            state.filterResult = state.list;
        },
        changeItemTask: (state, action) => {
            let element = state.list.findIndex(e => e.id === action.payload.id);
            state.list[element].task = action.payload.task;
            state.filterResult = state.list;
        },
        addItem: (state) => {
            if (state.lastTask !== '') {
                let id = state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 1;
                state.list.push({id: id, task: state.lastTask, status: 'active', editing: false});
                state.lastTask = '';
                state.countOfActiveTasks += 1;
                state.filterResult = state.list;
                state.filter = 'all';
            }
        },
        deleteItem: (state, action) => {
            state.list = state.list.filter(e => e.id !== action.payload.id);
            state.countOfActiveTasks = state.list.filter(e => e.status === 'active').length;
            state.filterResult = state.list;
            state.filter = 'all';
        },
        deleteCompleted: state => {
            state.list = state.list.filter(e => e.status !== 'completed');
            state.filterResult = state.list;
        },
        changeLastTask: (state, action) => {
            state.lastTask = action.payload.task;
        },
        completedAll: state => {
            if (state.list.every(item => item.status === 'active') ||
                state.list.some(item => item.status === 'active')) {
                state.list.forEach((item) => {
                    item.status = 'completed';
                });
                state.countOfActiveTasks = 0;
            } else {
                state.list.forEach((item) => {
                    item.status = 'active';
                });
                state.countOfActiveTasks = state.list.length;
            }
            state.filterResult = state.list;
        },
        changeFilter: (state, action) => {
            switch (action.payload.filter) {
                case 'all' :
                    state.filterResult = state.list;
                    state.filter = 'all';
                    state.countOfActiveTasks = state.list.filter(el => el.status === 'active').length;
                    break;
                case 'active' :
                    state.filterResult = state.list.filter(el => el.status !== 'completed');
                    state.filter = 'active';
                    state.countOfActiveTasks = state.list.filter(el => el.status === 'active').length;
                    break;
                case 'completed' :
                    state.filterResult = state.list.filter(el => el.status !== 'active');
                    state.filter = 'completed';
                    state.countOfActiveTasks = state.list.filter(el => el.status === 'active').length;
                    break;
                case 'item' :
                    state.filterResult = state.list.filter(el => el.id === action.payload.id);
                    state.filter = 'all';
                    state.countOfActiveTasks = state.list.filter(el => el.status === 'active').length;
                    break;
                default:
                    return;
            }
        }
    }
});

export const {
    changeItemStatus,
    changeItemTask,
    changeEditing,
    addItem,
    deleteItem,
    deleteCompleted,
    changeLastTask,
    completedAll,
    changeFilter
} = toDoSlice.actions
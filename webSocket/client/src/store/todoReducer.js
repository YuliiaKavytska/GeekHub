import {createSlice} from '@reduxjs/toolkit';

export const toDoSlice = createSlice({
    name: 'list',
    initialState: {
        list: [],
        lastTask: '',
        countOfActiveTasks: 0,
        filter: 'all',
        filterResult: [],
        error: null
    },
    reducers: {
        setTodos: (state, action) => {
            state.list = action.payload.list;
            state.lastTask = action.payload.lastTask;
            state.filterResult = action.payload.list;
            state.countOfActiveTasks = action.payload.list.filter(e => e.status === 'active').length;
            state.error = null;
        },
        changeItemStatus: (state, action) => {
            let element = state.list.findIndex(e => e.id === action.payload.id);
            state.list[element].status === 'active'
                ? state.list[element].status = 'completed'
                : state.list[element].status = 'active';
            state.countOfActiveTasks = state.list.filter(e => e.status === 'active').length;
            state.filterResult = state.list;
            state.filter = 'all';
            state.error = null;
        },
        changeEditing: (state, action) => {
            let element = state.list.findIndex(e => e.id === action.payload.id);
            // рассматриваем случай. мы тыкнули в другом месте или сделали двойной клик?
            // если в другом месте, то это false, а если двойной то нулл
            // если мы тыкнули два раза, тогда мы меняем статус редактирования
            // но если мы тыкнули в другом месте то в этом лучаем мы ВСЕГДА просто ВЫКЛЮЧАЕМ редактирование
            action.payload.case === false
                ? state.list[element].editing = false
                : state.list[element].editing = !state.list[element].editing;
            state.filterResult = state.list;
        },
        setChangedTask: (state, action) => {
            state.list = state.list.map(e => e.id === action.payload.id ? {...e, task: action.payload.task} : e);
            state.filterResult = state.list;
        },
        changeItemTask: (state, action) => {
            let element = state.list.findIndex(e => e.id === action.payload.id);
            state.list[element].task = action.payload.task;
            state.filterResult = state.list;
            state.error = null;
        },
        addItem: (state, action) => {
            if (state.lastTask !== '') {
                let id = state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 1;
                state.list.push({id: id, task: action.payload.task, status: 'active', editing: false});
                state.lastTask = '';
                state.countOfActiveTasks += 1;
                state.filterResult = state.list;
                state.filter = 'all';
            }
            state.error = null;
        },
        deleteItem: (state, action) => {
            state.list = state.list.filter(e => e.id !== action.payload.id);
            state.countOfActiveTasks = state.list.filter(e => e.status === 'active').length;
            state.filterResult = state.list;
            state.filter = 'all';
            state.error = null;
        },
        deleteCompleted: state => {
            state.list = state.list.filter(e => e.status !== 'completed');
            state.filterResult = state.list;
            state.error = null;
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
            state.error = null;
        },
        changeFilter: (state, action) => {
            switch (action.payload.filter) {
                case 'all' :
                    state.filterResult = state.list;
                    state.filter = 'all';
                    break;
                case 'active' :
                    state.filterResult = state.list.filter(el => el.status !== 'completed');
                    state.filter = 'active';
                    break;
                case 'completed' :
                    state.filterResult = state.list.filter(el => el.status !== 'active');
                    state.filter = 'completed';
                    break;
                case 'item' :
                    state.filterResult = state.list.filter(el => el.id === action.payload.id);
                    state.filter = 'all';
                    break;
                default:
                    return;
            }
            state.countOfActiveTasks = state.list.filter(el => el.status === 'active').length;
            state.error = null;
        },
        setErrorResponse: (state, action) => {
            state.error = action.payload.error;
        }
    }
});

export const getUsersTC = (filter, id = null, editingMode = null) => (dispatch) => {
    ajax('/api/all', 'GET').then(response => {
        const resultPromise = response.json();
        if (response.status === 200) {
            resultPromise.then(data => {
                dispatch(setTodos({list: data.list, lastTask: data.lastTask}));
                dispatch(changeFilter({filter, id}));
                if (editingMode) dispatch(changeEditing({id}))
            })
        } else {
            resultPromise.then(data => {
                dispatch(setErrorResponse({error: data.message}));
            })
        }
    });
}

let ajax = (url, method, body = {}) => {
    let settings = {
        method,
        headers: {"X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json"}
    }
    if (Object.keys(body).length !== 0) {
        settings['body'] = JSON.stringify(body)
    }
    return fetch(url, settings);
}

export const {
    setTodos,
    changeItemStatus,
    changeItemTask,
    changeEditing,
    setChangedTask,
    addItem,
    deleteItem,
    deleteCompleted,
    changeLastTask,
    completedAll,
    changeFilter,
    setErrorResponse
} = toDoSlice.actions

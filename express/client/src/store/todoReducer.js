import {createSlice} from '@reduxjs/toolkit'

export const toDoSlice = createSlice({
    name: 'list',
    initialState:
        {
            list: [],
            lastTask: localStorage['lastTodo']
                ? JSON.parse(localStorage['lastTodo']) : '',
            countOfActiveTasks: 0,
            filter: 'all',
            filterResult: []
        },
    reducers: {
        setTodos: (state, action) => {
            state.list = action.payload.list;
            state.filterResult = action.payload.list;
            state.countOfActiveTasks = action.payload.list.filter(e => e.status === 'active').length;
        },
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
                :
                state.list[element].editing = !state.list[element].editing;
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

export const getUsersTC = (filter, id = null, editingMode = null) => (dispatch) => {
    fetch('/all', {
        method: 'GET',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setTodos({list: data.list}));
                dispatch(changeFilter({filter, id}));
                if (editingMode) {
                    dispatch(changeEditing({id}))
                }
            }
        });
}

export const completeAllTC = () => (dispatch) => {
    fetch('/completeAll', {
        method: 'GET',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) dispatch(completedAll());
        });
}

export const changeStatusTC = (id) => (dispatch) => {
    fetch('/changeTodo', {
        method: 'PUT',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) dispatch(changeItemStatus({id}));
        });
}

export const deleteTodoTC = (id) => (dispatch) => {
    fetch('/changeTodo', {
        method: 'DELETE',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) dispatch(deleteItem({id}))
        })
}

export const addNewTodoTC = (lastTask) => (dispatch) => {
    fetch('/newTodo', {
        method: 'POST',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({task: lastTask})
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) dispatch(addItem());
        })
}

export const deleteCompletedTC = () => (dispatch) => {
    fetch('/deleteCompleted', {
        method: 'DELETE',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) dispatch(deleteCompleted());
        })
}

export const changeTodoTC = (id, itemCase, task) => (dispatch) => {
    fetch('/changeTodo', {
        method: 'POST',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id, task})
    })
        .then(res => res.json())
        .then(data => {
            if (data.resultCode === 0) dispatch(changeEditing({id, case: itemCase}));
        })
}

export const {
    setTodos,
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

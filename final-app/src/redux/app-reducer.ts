

let initialState = {
    initialized: false,
    userId: null as number | null
}

type StateType = typeof initialState

const appReducer = (state = initialState, action: any): StateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default appReducer
let initialState = {
    profile: {
        id: 1,
        name: 'Yuliia',
        surname: 'Kavytska',
        favorites: [1, 2],
        contacts: [
            {
                id: 1,
                name: 'Katya',
                phones: [
                    {id: 1, number: '0935851715',},
                    {id: 2, number: '0935851468',},
                    {id: 3, number: '0685851715',},
                ],
                email: null,
                address: null,
                comment: null,
            },
            {
                id: 2,
                name: 'Misha',
                phones: [
                    {id: 1, number: '0935851715',},
                ],
                email: null,
                address: null,
                comment: null,
            },
        ]
    }
}

type StateType = typeof initialState

const contactsReducer = (state = initialState, action: any): StateType => {
    switch (action.type) {
        default:
            return state
    }
}

export default contactsReducer
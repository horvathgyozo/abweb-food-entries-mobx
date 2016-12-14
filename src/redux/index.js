import { INCREASE_DATE, DECREASE_DATE, ADD_ENTRIES } from './actions'

const initialState = {
    date: new Date(),
    entries: [
        // {
        //     food: 'kenyér',
        //     quantity: '20dkg',
        //     meal: 'tízórai',
        // },
        //...
    ],
    selectedEntry: null
}

function copy(state) {
    return JSON.parse(JSON.stringify(state))
}

function increaseDate(state) {
    return Object.assign({}, state, {
        date: new Date(state.date.getTime() + 1000*60*60*24)
    })
}

function decreaseDate(state) {
    return Object.assign({}, state, {
        date: new Date(state.date.getTime() - 1000*60*60*24)
    })
}

function addEntries(state, newEntries) {
    return Object.assign({}, state, {
        entries: state.entries.concat(newEntries)
    })
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE_DATE:
            return increaseDate(state)
        case DECREASE_DATE:
            return decreaseDate(state)
        case ADD_ENTRIES:
            return addEntries(state, action.payload)
    }
    return state
}

// console.log(state)
// console.log(increaseDate(state))
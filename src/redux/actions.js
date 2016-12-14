export const INCREASE_DATE = 'INCREASE_DATE'
export function increaseDate() {
    return {
        type: INCREASE_DATE
    }
}

export const DECREASE_DATE = 'DECREASE_DATE'
export function decreaseDate() {
    return {
        type: DECREASE_DATE
    }
}

export const ADD_ENTRIES = 'ADD_ENTRIES'
export function addEntries(entries) {
    return {
        type: ADD_ENTRIES,
        payload: entries
    }
}

export const FETCH_ENTRIES = 'FETCH_ENTRIES'
export function fetchEntries() {
    return (dispatch, getState) => {
        // const date = 

        return fetch(`http://localhost:4000/entries`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
            }
        })
        .then(response => response.json())
        .then(json => json.data.map(obj => Object.assign(obj.attributes, {id: obj.id})))
        .then(entries => dispatch(addEntries(entries)))
    }
}


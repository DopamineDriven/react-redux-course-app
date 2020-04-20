

// all reducers accept state and an action as args
export default function courseReducer(state = [], action) {
    switch(action.type) {
        case "CREATE_COURSE":
            debugger;
            // create new array containing all existing courses plus one additional course passed in
            return [...state, { ...action.course }]
        // always declare reducer default so if !change in state it is untouched
        default: 
            return state
    }
}
// reducer.js


const initialState = {
    HomeKey: { data: '/' },
}
function counterReducer(state = initialState, action) {
    let ObjKey = action.type
    switch (action.type) {

        default:
            return {
                ...state,
                [ObjKey]: { data: action.data, loading: action.loading }
            }
    }
}

export default counterReducer;

const reducer = (state='all', action) => {
    switch(action.type){
        case 'updateState': return action.payload;
        default : return state;
    }
}


export default reducer;
import { INCREMENT, UPDATE_ABOX, UPDATE_TBOX } from "./type";


const datasetInitialState = {
    tbox:'',
    abox: '',
    datasetList:'',
    treeStructure:'',
    value:0
}

const datasetReducer = (state = datasetInitialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { ...state, 
                value: state.value+action.incVal
        };
        case UPDATE_TBOX:
            return {
                ...state,
                tbox: action.tbox
        }
        case UPDATE_ABOX:
            return{
                ...state,
                abox:action.abox
            }
        default:
            return state;
    }
};


const rootReducer = {
    datasetReducer:datasetReducer,
};
  
export default rootReducer;
import { INCREMENT, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_TBOX } from "./type";


const datasetInitialState = {
    tbox:'',
    abox: '',
    treeStructure:'',
    dataset:'',
    value:0,
    datasetList:[]

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
        case UPDATE_DATASET:
            return{
                ...state,
                dataset: action.dataset
            }
        case UPDATE_DATASET_LIST:
            return{
                ...state,
                datasetList: action.datasetList
            }
        default:
            return state;
    }
};


const rootReducer = {
    datasetReducer:datasetReducer,
};
  
export default rootReducer;
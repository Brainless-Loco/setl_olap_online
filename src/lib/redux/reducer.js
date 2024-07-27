import { ADD_TO_PREFIX_LIST, INCREMENT, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_DIMENSION_TREES, UPDATE_TBOX, UPDATE_TOTAL_NUM_OF_OBSERVATIONS } from "./type";


const datasetInitialState = {
    tbox:'',
    abox: '',
    treeStructures:{},
    dataset:'',
    prefixes: {},
    datasetList:[],
    totalNumOfObservations:0

}

const datasetReducer = (state = datasetInitialState, action) => {
    switch (action.type) {
        case UPDATE_TBOX:
            return {
                ...state,
                tbox: action.tbox
        }
        case UPDATE_ABOX:
            return{
                ...state,
                abox: action.abox
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
        case ADD_TO_PREFIX_LIST:
            return{
                ...state,
                prefixes : action.prefixes
            }
        case UPDATE_TOTAL_NUM_OF_OBSERVATIONS:
            return{
                ...state,
                totalNumOfObservations: action.observations
            }
        case UPDATE_DIMENSION_TREES:
            return{
                ...state,
                treeStructures: action.treeStructures
            }
        default:
            return state;
    }
};


const rootReducer = {
    datasetReducer:datasetReducer,
};
  
export default rootReducer;
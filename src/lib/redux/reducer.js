import { ADD_TO_PREFIX_LIST, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_DIMENSION_TREES, UPDATE_MEASURE_LIST, UPDATE_TBOX, UPDATE_TOTAL_NUM_OF_OBSERVATIONS } from "./type";


const datasetInitialState = {
    tbox:'',
    abox: '',
    treeStructures:{},
    measuresList:{},
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
        case UPDATE_MEASURE_LIST:
            return{
                ...state,
                measuresList: action.measuresList            }
        default:
            return state;
    }
};


const rootReducer = {
    datasetReducer:datasetReducer,
};
  
export default rootReducer;
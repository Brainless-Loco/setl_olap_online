import { ADD_TO_ALL_LEVEL_DATA, ADD_TO_PREFIX_LIST, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_DIMENSION_TREES, UPDATE_MEASURE_LIST, UPDATE_SELECTED_LEVEL_DATA, UPDATE_TBOX } from "./type";


const datasetInitialState = {
    tbox:'',
    abox: '',
    prefixes: {},
    datasetList:[],
    dataset:'',
    treeStructures:{},
    measuresList:{},
    allLevelData:{},
    selectedLevelData:{}
}

const selectionForQueryState = {
    selectedLevels:[],
    selectedMeasures:[]
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
        case UPDATE_DIMENSION_TREES:
            return{
                ...state,
                treeStructures: action.treeStructures
            }
        case UPDATE_MEASURE_LIST:
            return{
                ...state,
                measuresList: action.measuresList
            }
        case UPDATE_SELECTED_LEVEL_DATA:
            return{
                ...state,
                selectedLevelData: action.selectedLevelData
            }
        case ADD_TO_ALL_LEVEL_DATA:
            return{
                ...state,
                allLevelData: {...state.allLevelData, [action.levelName]:action.newLevelData}
            }


        default:
            return state;
    }
};

const queryReducer = (state=selectionForQueryState,action)=> {
    switch (action.type) {
        default:
            return state;
    }

}

const rootReducer = {
    datasetReducer:datasetReducer,
    queryReducer: queryReducer
};
  
export default rootReducer;
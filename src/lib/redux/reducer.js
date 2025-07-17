import { getFullIRIFromPrefix, remove_agg_func, removeLevel, tryToAddLevel, updateAttributeToBeViewList, updateSelectedInstances, checkMeasureAdditivity } from "../custom/helper";
import { ADD_TO_ALL_LEVEL_DATA, ADD_TO_PREFIX_LIST, CLEAR_FOR_DATASET_CHANGE, REMOVE_AN_AGGREGATE_FUNCTION_FROM_A_MEASURE, REMOVE_LEVEL, REMOVE_MEASURE_FROM_SELECTED_MEASURE_LIST, TRY_TO_ADD_LEVEL, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_DIMENSION_TREES, UPDATE_LEVEL_ATTRIBUTES_TO_VIEW_LIST, UPDATE_LEVEL_INSTANCES, UPDATE_MEASURE_LIST, UPDATE_SELECTED_LEVEL_DATA, UPDATE_SELECTED_MEASURE_LIST, UPDATE_TBOX, CLEAR_ALERT } from "./type";


const datasetInitialState = {
    tbox: '',
    abox: '',
    prefixes: {},
    datasetList: [],
    dataset: '',
    treeStructures: {},
    measuresList: {},
    allLevelData: {},
    selectedLevelData: {}
}

const datasetReducer = (state = datasetInitialState, action) => {
    switch (action.type) {
        case UPDATE_TBOX:
            return {
                ...state,
                tbox: action.tbox
            }
        case UPDATE_ABOX:
            return {
                ...state,
                abox: action.abox
            }
        case UPDATE_DATASET:
            return {
                ...state,
                dataset: action.dataset
            }
        case UPDATE_DATASET_LIST:
            return {
                ...state,
                datasetList: action.datasetList
            }
        case ADD_TO_PREFIX_LIST:
            return {
                ...state,
                prefixes: action.prefixes
            }
        case UPDATE_DIMENSION_TREES:
            return {
                ...state,
                treeStructures: action.treeStructures
            }
        case UPDATE_MEASURE_LIST:
            return {
                ...state,
                measuresList: action.measuresList
            }
        case UPDATE_SELECTED_LEVEL_DATA:
            return {
                ...state,
                selectedLevelData: action.selectedLevelData
            }
        case ADD_TO_ALL_LEVEL_DATA:
            return {
                ...state,
                allLevelData: { ...state.allLevelData, [action.levelName]: action.newLevelData }
            }
        case CLEAR_FOR_DATASET_CHANGE:
            return {
                ...state,
                selectedLevelData: {}
            }

        default:
            return state;
    }
};



const selectionForQueryState = {
    tbox: '',
    abox: '',
    selectedDataset: '',
    selectedLevels: {},
    selectedMeasures: [],
    alertInfo: {
        message: '',
        type: '',
        title: '' // success | warning | error | info | question
    }
}

const queryReducer = (state = selectionForQueryState, action) => {
    switch (action.type) {
        // Common
        case UPDATE_TBOX:
            return {
                ...state,
                tbox: action.tbox
            }
        case UPDATE_ABOX:
            return {
                ...state,
                abox: action.abox
            }
        case UPDATE_DATASET:
            return {
                ...state,
                selectedDataset: getFullIRIFromPrefix(action.dataset, action.prefixes)
            }

        case CLEAR_FOR_DATASET_CHANGE:
            return {
                ...state,
                selectedLevelData: [],
                selectedMeasures: [],
                alertInfo: {
                    message: '',
                    type: '',
                    title: ''
                }
            }

        // Measure Works
        case UPDATE_SELECTED_MEASURE_LIST:
            const { alertInfo, updatedMeasures } = checkMeasureAdditivity(action.measures)
            // selectedLevels
            return {
                ...state,
                selectedMeasures: updatedMeasures,
                alertInfo: alertInfo
            }
        case REMOVE_MEASURE_FROM_SELECTED_MEASURE_LIST:
            return {
                ...state,
                selectedMeasures: state.selectedMeasures.filter(m => m.measureName !== action.measureName)
            }
        case REMOVE_AN_AGGREGATE_FUNCTION_FROM_A_MEASURE:
            return {
                ...state,
                selectedMeasures: remove_agg_func(state.selectedMeasures, action.measureName, action.aggFuncName)

            }

        // Level Works
        case TRY_TO_ADD_LEVEL:
            return {
                ...state,
                selectedLevels: tryToAddLevel(action.levelInfo, state.selectedLevels)
            }
        case REMOVE_LEVEL:
            return {
                ...state,
                selectedLevels: removeLevel(action.levelName, state.selectedLevels)
            }
        case UPDATE_LEVEL_ATTRIBUTES_TO_VIEW_LIST:
            return {
                ...state,
                selectedLevels: updateAttributeToBeViewList(action.attributeList, action.levelName, state.selectedLevels)
            }
        case UPDATE_LEVEL_INSTANCES:
            return {
                ...state,
                selectedLevels: updateSelectedInstances(action.levelName, action.attribute, action.instances, state.selectedLevels)
            }

        // Alert Works
        case CLEAR_ALERT:
            return {
                ...state,
                alertInfo: {
                    message: '',
                    type: ''
                }
            };

        default:
            return state;
    }

}

const rootReducer = {
    datasetReducer: datasetReducer,
    queryReducer: queryReducer
};

export default rootReducer;

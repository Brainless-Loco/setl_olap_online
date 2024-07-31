import { ADD_LEVEL, ADD_TO_ALL_LEVEL_DATA, ADD_TO_PREFIX_LIST, REMOVE_AN_AGGREGATE_FUNCTION_FROM_A_MEASURE, REMOVE_LEVEL, REMOVE_MEASURE_FROM_SELECTED_MEASURE_LIST, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_DIMENSION_TREES, UPDATE_LEVEL_ATTRIBUTES_TO_VIEW_LIST, UPDATE_LEVEL_INSTANCES, UPDATE_MEASURE_LIST, UPDATE_SELECTED_LEVEL_DATA, UPDATE_SELECTED_MEASURE_LIST, UPDATE_TBOX } from "./type";

export const update_TBox = (tbox)=> ({
    type: UPDATE_TBOX,
    tbox:tbox
})

export const update_ABox = (abox) => ({
    type: UPDATE_ABOX,
    abox:abox
})

export const update_dataset = (dataset) => ({
    type: UPDATE_DATASET,
    dataset:dataset
})

export const update_dataset_list = (datasetList) => ({
    type: UPDATE_DATASET_LIST,
    datasetList:datasetList
})

export const add_to_prefix_list = (prefixes) => ({
    type: ADD_TO_PREFIX_LIST,
    prefixes: prefixes
})

export const update_dimension_tree = (treeStructures)=>({
    type: UPDATE_DIMENSION_TREES,
    treeStructures: treeStructures
})

export const update_measure_list = (measuresList) => ({
    type: UPDATE_MEASURE_LIST,
    measuresList: measuresList
})

export const update_selected_level_data = (selectedLevelData) => ({
    type: UPDATE_SELECTED_LEVEL_DATA,
    selectedLevelData: selectedLevelData
})

export const add_to_all_level_data = (levelName, levelData) => ({
    type: ADD_TO_ALL_LEVEL_DATA,
    levelName: levelName,
    newLevelData: levelData
})


// Actions for Query Reducer

export const add_level = (levelInfo) =>({
    type: ADD_LEVEL,
    levelInfo: levelInfo
})

export const remove_level = (levelName) => ({
    type: REMOVE_LEVEL,
    levelName: levelName
})

export const update_selected_measure_list = (measures) => ({
    type: UPDATE_SELECTED_MEASURE_LIST,
    measures: measures
})

export const remove_measure_from_selected_measure_list = (measureName) => ({
    type: REMOVE_MEASURE_FROM_SELECTED_MEASURE_LIST,
    measureName: measureName
})

export const remove_an_aggregate_function_from_a_measure = (aggFuncName, measureName) => ({
    type: REMOVE_AN_AGGREGATE_FUNCTION_FROM_A_MEASURE,
    aggFuncName: aggFuncName,
    measureName: measureName
})

export const update_level_instances = (levelName, levelInstances) => ({
    type: UPDATE_LEVEL_INSTANCES,
    levelName: levelName,
    levelInstances: levelInstances
})

export const update_level_attribute_to_view_list = (levelName, attributeList) => ({
    type: UPDATE_LEVEL_ATTRIBUTES_TO_VIEW_LIST,
    levelName:levelName,
    attributeList: attributeList
}) 
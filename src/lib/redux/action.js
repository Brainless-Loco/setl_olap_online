import { ADD_TO_PREFIX_LIST, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_DIMENSION_TREES, UPDATE_MEASURE_LIST, UPDATE_TBOX, UPDATE_TOTAL_NUM_OF_OBSERVATIONS } from "./type";

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

export const update_total_num_of_observations = (observations) =>({
    type: UPDATE_TOTAL_NUM_OF_OBSERVATIONS,
    observations: observations
})

export const update_dimension_tree = (treeStructures)=>({
    type: UPDATE_DIMENSION_TREES,
    treeStructures: treeStructures
})

export const update_measure_list = (measuresList) => ({
    type: UPDATE_MEASURE_LIST,
    measuresList: measuresList
})
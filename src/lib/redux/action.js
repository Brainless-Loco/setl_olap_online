import { INCREMENT, UPDATE_ABOX, UPDATE_DATASET, UPDATE_DATASET_LIST, UPDATE_TBOX } from "./type";


export const increment = (ektaVal) => ({ 
    type: INCREMENT,
    incVal:ektaVal
});

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
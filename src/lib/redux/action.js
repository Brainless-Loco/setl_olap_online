import { INCREMENT, UPDATE_ABOX, UPDATE_TBOX } from "./type";


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
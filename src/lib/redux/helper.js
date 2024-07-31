export const remove_agg_func = (selectedMeasures, measureName, aggFuncName)=>{
    var tempMeasures = selectedMeasures.map(measure => {
        if (measure.measureName === measureName) {
            const newAggFunctions = measure.aggFunctions.filter(aggFunc => aggFunc.aggFuncName !== aggFuncName);
            if (newAggFunctions.length === 0) {
                return null;
            }
            return { ...measure, aggFunctions: newAggFunctions };
        }
        return measure;
    });
    return tempMeasures.filter(measure => measure !== null);
}
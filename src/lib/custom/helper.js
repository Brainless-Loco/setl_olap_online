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

export const tryToAddLevel = (levelInfo, selectedLevels) => {
    const levelExists = selectedLevels.some(l => l.levelName === levelInfo.levelName);
  
    if (!levelExists) {
      // If not present, add the level with the blank template
      const newLevel = {
        levelName: levelInfo.levelName,
        prefixName: levelInfo.prefixName,
        attributesToBeViewed: [],
        selectedInstances: []
      };
  
      return [...selectedLevels, newLevel];
    }
  
    return selectedLevels;
  };
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

export const removeLevel = (levelName, selectedLevels) => {
  return  selectedLevels.filter(level => level.levelName !== levelName)
};

export const updateAttributeToBeViewList = (attributeList, levelName, selectedLevels) => {
  const updatedLevels = selectedLevels.map(level => {
    if (level.levelName === levelName) {
      return {
        ...level,
        attributesToBeViewed: attributeList
      };
    }
    return level;
  });
  return updatedLevels;
}

export const updateSelectedInstances = (levelName, attribute, instances, selectedLevels) => {
  const updatedLevels = selectedLevels.map(level => {
    if (level.levelName === levelName) {
      const updatedInstances = level.selectedInstances.map(attr => {
        if (attr.prefixIRI === attribute.prefixIRI) {
          return {
            "prefixIRI": attr.prefixIRI,
            "originalIRI": attr.originalIRI,
            instances
          };
        }
        return attr;
      });
      const attributeExists = updatedInstances.some(attr => attr.prefixIRI === attribute.prefixIRI);
      if (!attributeExists) {
        updatedInstances.push({
          ...attribute,
          instances
        });
      }
      return {
        ...level,
        selectedInstances: updatedInstances.filter(attr=>attr.instances.length>0)
      };
    }
    return level;
  });
  return updatedLevels;
}
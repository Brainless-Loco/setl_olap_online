const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export function checkMeasureAdditivity(measures, selectedLevelData) {
  const SUM_URI = "http://purl.org/qb4olap/cubes#sum";
  const alertInfo = { message: "", title: "", type: "" };
  const updatedMeasures = [];

  for (const measure of measures) {
    const isNonAdditive = measure.additivityInfo?.nonAdditiveDims === true;
    const semiAdditiveDims = measure.additivityInfo?.semiAdditiveDims || [];
    const aggFunctions = measure.aggFunctions;
    const hasSum = aggFunctions.some(func => func.aggFuncName === SUM_URI);
    const hasOnlySum = aggFunctions.length === 1 && hasSum;

    // CASE 1: Measure is non-additive and has only SUM
    if (isNonAdditive && hasOnlySum) {
      alertInfo.message = "The selected measure cannot be aggregated using SUM because it is non-additive across all dimensions.";
      alertInfo.title = "Invalid Aggregation";
      alertInfo.type = "error";
      continue; // Exclude the measure entirely
    }

    // CASE 2: Measure is non-additive and includes SUM among other aggFuncs
    if (isNonAdditive && hasSum && !hasOnlySum) {
      const filteredAggs = aggFunctions.filter(func => func.aggFuncName !== SUM_URI);
      updatedMeasures.push({ ...measure, aggFunctions: filteredAggs });
      alertInfo.message = "SUM aggregation has been removed because the selected measure is non-additive and cannot be summed across any dimension.";
      alertInfo.title = "SUM Removed from Non-Additive Measure";
      alertInfo.type = "warning";
      continue;
    }

    // CASE 3: Measure is non-additive but has no SUM – include as-is
    if (isNonAdditive && !hasSum) {
      updatedMeasures.push(measure);
      continue;
    }

    // CASE 5: Measure is semi-additive
    if (semiAdditiveDims.length > 0) {
      const selectedDims = Object.keys(selectedLevelData);

      const hasInvalidDim = selectedDims.some(dimIRI => !semiAdditiveDims.includes(dimIRI));

      if (hasInvalidDim) {
        alertInfo.message= `The selected measure - "${measure.measurePrefixName}" is semi-additive and cannot be used with one or more selected dimensions.`;
        alertInfo.title= "Semi-Additive Constraint Violation";
        alertInfo.type= "error";
        continue; // Do not add the measure
      }

      updatedMeasures.push(measure); // All dimensions are valid
      continue;
    }
    
    // CASE 4: Measure is additive
    updatedMeasures.push(measure);
  }
  return { alertInfo, updatedMeasures };
}




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

export const tryToAddLevel = (levelInfo, selectedData, selectedMeasures) => {
  const { levelName, prefixName, inDimension, rollupSerial, inHierarchy } = levelInfo;

  const alertInfo = { message: "", title: "", type: "" };

  // STEP 1: Check for incompatible semi-additive measures
  for (const measure of selectedMeasures) {
    const additivityInfo = measure.additivityInfo;

    if (
      additivityInfo &&
      Array.isArray(additivityInfo.semiAdditiveDims) &&
      !additivityInfo.semiAdditiveDims.includes(inDimension)
    ) {
      alertInfo.message = `Cannot add level "${prefixName}" from dimension "${inDimension}" as the selected measure "${measure.measurePrefixName}" is Semi-additive to other dimensions.`;
      alertInfo.title = "Semi-Additivity Restriction";
      alertInfo.type = "error";

      return {
        alertInfo,
        updatedSelectedData: selectedData // No changes made
      };
    }
  }

  // STEP 2: Create a deep copy of selectedData to avoid mutation
  const newSelectedData = { ...selectedData };

  // STEP 3: Initialize or clone the dimension block
  if (!newSelectedData[inDimension]) {
    newSelectedData[inDimension] = {
      dimensionName: inDimension,
      rollupSerial,
      selectedHierarchy: inHierarchy,
      selectedLevels: []
    };
  } else {
    newSelectedData[inDimension] = { ...newSelectedData[inDimension] };
    newSelectedData[inDimension].selectedLevels = [...newSelectedData[inDimension].selectedLevels];
  }

  const selectedLevels = newSelectedData[inDimension].selectedLevels;

  // STEP 4: Avoid duplicate level addition
  const levelExists = selectedLevels.some(l => l.levelName === levelName);

  if (!levelExists) {
    const newLevel = {
      levelName,
      prefixName,
      attributesToBeViewed: [],
      selectedInstances: []
    };

    selectedLevels.push(newLevel);
    newSelectedData[inDimension].selectedLevels = selectedLevels;
  }

  return {
    alertInfo,
    updatedSelectedData: newSelectedData
  };
};




export const removeLevel = (levelName, selectedData) => {
  // Create a deep copy of the selectedData to avoid mutation
  const newSelectedData = deepCopy(selectedData);

  // Iterate over each dimension in newSelectedData
  Object.keys(newSelectedData).forEach(dimensionIRI => {
    // Filter out the level from the selectedLevels array for the current dimension
    newSelectedData[dimensionIRI].selectedLevels = newSelectedData[dimensionIRI].selectedLevels.filter(level => level.levelName !== levelName);
    
    if (newSelectedData[dimensionIRI].selectedLevels.length === 0) {
      delete newSelectedData[dimensionIRI];
    }
  });

  return newSelectedData;
};

export const updateAttributeToBeViewList = (attributeList, levelName, selectedData) => {
  // Create a new copy of the selectedData to avoid mutation
  const newSelectedData = Object.keys(selectedData).reduce((acc, dimensionIRI) => {
    // Create a copy of the selectedLevels array for the current dimension
    const updatedSelectedLevels = selectedData[dimensionIRI].selectedLevels.map(level => {
      if (level.levelName === levelName) {
        return {
          ...level,
          attributesToBeViewed: attributeList
        };
      }
      return level;
    });

    // Create a copy of the current dimension object with the updated selectedLevels
    acc[dimensionIRI] = {
      ...selectedData[dimensionIRI],
      selectedLevels: updatedSelectedLevels
    };

    return acc;
  }, {});

  return newSelectedData;
};


export const updateSelectedInstances = (levelName, attribute, instances, selectedData) => {
  // Create a deep copy of the selectedData to avoid mutation
  const newSelectedData = deepCopy(selectedData);

  // Iterate over each dimension in newSelectedData
  Object.keys(newSelectedData).forEach(dimensionIRI => {
    // Iterate over the selected levels within each dimension
    newSelectedData[dimensionIRI].selectedLevels = newSelectedData[dimensionIRI].selectedLevels.map(level => {
      if (level.levelName === levelName) {
        // Update the selectedInstances for the matching attribute within the level
        const updatedInstances = level.selectedInstances.map(attr => {
          if (attr.prefixIRI === attribute.prefixIRI) {
            return {
              prefixIRI: attr.prefixIRI,
              originalIRI: attr.originalIRI,
              instances
            };
          }
          return attr;
        });

        // Check if the attribute already exists, if not, add it
        const attributeExists = updatedInstances.some(attr => attr.prefixIRI === attribute.prefixIRI);
        if (!attributeExists) {
          updatedInstances.push({
            ...attribute,
            instances
          });
        }

        return {
          ...level,
          selectedInstances: updatedInstances.filter(attr => attr.instances.length > 0)
        };
      }
      return level;
    });
  });

  return newSelectedData;
};

export const splitIRI = (iri)=> {
  const hashIndex = iri.lastIndexOf('#');
  const slashIndex = iri.lastIndexOf('/');

  if (hashIndex > slashIndex) {
    return [iri.slice(0, hashIndex + 1), iri.slice(hashIndex + 1)];
  } else {
    return [iri.slice(0, slashIndex + 1), iri.slice(slashIndex + 1)];
  }
}


export const getFullIRIFromPrefix = (prefix, prefixes) => {
  const [prefixKey, localName] = prefix.split(':');
  const namespace = prefixes[prefixKey];

  if (!namespace) {
    throw new Error(`Unknown prefix: ${prefixKey}`);
  }

  return namespace + localName;
};


const getRandomDeepColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 30%)`; // deep and vivid
};

export const extractChartData = (results) => {
  const labels = new Set();
  const datasets = {};

  results.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (row[key].datatype) { // This is a measure
        if (!datasets[key]) {
          const baseColor = getRandomDeepColor();
          datasets[key] = {
            label: key,
            data: [],
            borderColor: baseColor,
            backgroundColor: baseColor.replace('30%)', '30%, 0.6)'), // add alpha
          };
        }
        datasets[key].data.push(parseFloat(row[key].value));
      } else { // Assume this is a label (category)
        labels.add(row[key].value);
      }
    });
  });

  return {
    labels: Array.from(labels),
    datasets: Object.values(datasets),
  };
};



export default function GenerateQuery(everyThingForQuery) {
    
    const {selectedMeasures, selectedLevels, selectedDataset, abox, tbox} = everyThingForQuery

    const getVarName = iri => iri.split('#')[1] || iri.split('/').pop();

    let prefixes = "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n"
                 + "PREFIX qb: <http://purl.org/linked-data/cube#>\n"
                 + "PREFIX qb4o: <http://purl.org/qb4olap/cubes#>\n\n";

    let selectClause =  "SELECT "
    let groupByClause = "GROUP BY "
    let orderByClause = "ORDER BY "
    let whereClause = "WHERE {\n"
                    + `\t?o a qb:Observation . \n`
                    + `\t?o qb:dataSet <${selectedDataset}> .\n`;

    selectedMeasures.forEach((measure, idx) => {
        const measureVar = getVarName(measure.measureName);
        measure.aggFunctions.map((aggFunc, idx2) => {
            const aggFunctionName = aggFunc.prefixName.split(':')[1]
            selectClause += `(${aggFunctionName}(<${measure.range}>(?${measureVar}) as ?${aggFunctionName+'_'+ measureVar})) `;
            if(idx2==0){
                whereClause += `\t?o <${measure.measureName}> ?${measureVar} .\n`;
            }
        })
    });

    //  Adding levels to WHERE clause
     selectedLevels.forEach((level) => {
        const levelVar = '?' + getVarName(level.levelName);
        whereClause += `?o <${level.levelName}> ${levelVar} .\n`;

        let levelAttrVars = []

        // Adding attributes to be viewed
        level.attributesToBeViewed.forEach((attr) => {
            const attrVar = '?' + getVarName(attr.attributeName);
            levelAttrVars.push(attrVar)
            whereClause += `${levelVar} <${attr.attributeName}> ${attrVar} .\n`;
            selectClause += `${attrVar} `;
            groupByClause += `${attrVar} `;
            orderByClause += `${attrVar} `;
        });

        // Adding selected instances
        level.selectedInstances.forEach((instance) => {
            const instAttrVar = '?' + getVarName(instance.attributeName);
            if(levelAttrVars.includes(instAttrVar)==false){
                whereClause += `${levelVar} <${instance.attributeName}> ${instAttrVar} .\n`;
                levelAttrVars.push(instAttrVar);
            }
            whereClause += `${levelVar} <${instance.prefixIRI}> ${instAttrVar} .\n`;
            instance.instances.forEach((inst, instIdx) => {
                if (instIdx === 0) {
                    whereClause += `\tFILTER (`;
                } else {
                    whereClause += ' || ';
                }
                if (inst.type === 'uri') {
                    whereClause += `(${instAttrVar} = <${inst.value}>)`;
                } else {
                    whereClause += `(str(${instAttrVar}) = "${inst.value}")`;
                }
            });
            whereClause += `) .\n`;
        });
    });

    // Closing WHERE clause
    whereClause += '\n}\n';

    const query = `
        ${prefixes}
        ${selectClause}
        FROM <${abox}>
        FROM <${tbox}>
        ${whereClause}
        ${groupByClause}
        ${orderByClause}
    `;



    
    return query
}

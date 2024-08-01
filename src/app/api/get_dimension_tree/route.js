import { NextResponse } from 'next/server'

const SparqlClient = require("../sparqlClient/SparqlClient")



export async function POST (request=Request) {
    const {tbox,abox,dataset} = await request.json()

    const client = new SparqlClient()
    const sparql = `
prefix qb: <http://purl.org/linked-data/cube#>
prefix qb4o: <http://purl.org/qb4olap/cubes#>
prefix cdw: <http://bike-csecu.com/datasets/covid/cdw#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix covProperty: <http://bike-csecu.com/datasets/covid/cdw/covProperty#>\n`
    +  `SELECT DISTINCT(?dimension) ?hierarchy ?parent ?rollupProperty ?child\n`
    +  `FROM <${tbox}>\n`
    // +  `FROM<${abox}>\n`
    +  `WHERE {\n`
    +  `\t<${dataset}> rdf:type qb:DataSet;\n`
    +  `\t\tqb:structure ?cuboid.\n`
    +  `\t?cuboid qb:component ?BNodeForCuboidLevel;\n`
    +  `\t\tqb4o:isCuboidOf ?cube.\n`
    +  `\t?BNodeForCuboidLevel qb4o:level ?cuboidLevel.\n`
    +  `\t?cuboidHierarchy qb4o:hasLevel ?cuboidLevel;\n`

    +  `\t\tqb4o:inDimension ?dimension.\n`
    +  `\t?cube rdf:type qb:DataStructureDefinition;\n`

    +  `\t\tqb:component ?BNodeForDimension.\n`
    +  `\t?BNodeForDimension qb4o:dimension ?dimension.\n`
    +  `\t?dimension qb4o:hasHierarchy ?hierarchy.\n`

    +  `\t?hierarchy qb4o:hasLevel ?parent;\n`
    +  `\t\tqb4o:hasLevel ?child.\n`

    +  `\t?hStep rdf:type qb4o:HierarchyStep;\n`
    +  `\t\tqb4o:parentLevel ?parent;\n`
    +  `\t\tqb4o:childLevel ?child;\n`
    +  `\t\tqb4o:rollup ?rollupProperty.\n`
    +  `}\n`
    +  `ORDER BY ?dimension ?hierarchy ?parent`
    const result = await client.query(sparql)
    const data = result.data.results.bindings

    // console.log(data)

    return NextResponse.json({treeStructure:mergeResults(data) });
}


const mergeResults = (data) => {
    const mergedData = {};

    // Step 1: Merge data into a hierarchical structure
    data.forEach(item => {
        const dimensionUrl = item.dimension.value;
        const hierarchyUrl = item.hierarchy.value;

        if (!mergedData[dimensionUrl]) {
        mergedData[dimensionUrl] = {
            name: dimensionUrl,
            hierarchies: {}
        };
        }

        if (!mergedData[dimensionUrl].hierarchies[hierarchyUrl]) {
            mergedData[dimensionUrl].hierarchies[hierarchyUrl] = {
                name: hierarchyUrl,
                levels: {}
            };
        }

        mergedData[dimensionUrl].hierarchies[hierarchyUrl].levels[item.child.value] = {
            name: item.child.value,
            parentLevel: item.parent.value,
            rollupRelation: item.rollupProperty.value
        };

        // Also add the parent level if not already added (to ensure all levels are present)
        if (!mergedData[dimensionUrl].hierarchies[hierarchyUrl].levels[item.parent.value]) {
        mergedData[dimensionUrl].hierarchies[hierarchyUrl].levels[item.parent.value] = {
            name: item.parent.value,
            parentLevel: null, // Parent level's parent is not known at this point
            rollupRelation: null
        };
        }
    });

    // Step 2: Sort levels within each hierarchy
    Object.values(mergedData).forEach(dimension => {
        Object.values(dimension.hierarchies).forEach(hierarchy => {
            const levelsMap = hierarchy.levels;
            const levels = Object.values(levelsMap);

            // Create a map of child to parent
            const parentMap = {};
            levels.forEach(level => {
                if (level.parentLevel) {
                parentMap[level.name] = level.parentLevel;
                }
            });

            // Find the root levels (levels that are not a child of any other level)
            const rootLevels = levels.filter(level => !Object.values(parentMap).includes(level.name));

            // Sort levels starting from the root level
            let sortedLevels = [];
            const visited = new Set();

            const addLevel = (level) => {
                if (!visited.has(level.name)) {
                    visited.add(level.name);
                    level.inHierarchy = hierarchy.name
                    level.inDimension = dimension.name
                    sortedLevels.push(level);
                    const children = levels.filter(l => l.parentLevel === level.name);
                    children.forEach(addLevel);
                }
            };

            rootLevels.forEach(addLevel);
            levels.forEach(addLevel);

            sortedLevels = sortedLevels.map((l)=>{
                return {...l, rollUpSerial:sortedLevels}
            })

            sortedLevels = sortedLevels.reverse()

            hierarchy.levels = sortedLevels;

        });
    });

    // Convert mergedData to the desired structure
    const result = {
        dimension: Object.values(mergedData).map(dimension => ({
            name: dimension.name,
            hierarchies: Object.values(dimension.hierarchies).map(hierarchy => ({
                name: hierarchy.name,
                levels: hierarchy.levels,
                inDimension: dimension.name
            }))
        }))
    };
    return result
}

// export default handler;
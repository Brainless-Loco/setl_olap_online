
// Samples
/*
datasetInitialState.treeStructures:{
    "datasetIRI":{
        "dimensions":[
            name:"dimensionIRI",
            hierarchies:[
                {
                    name:"hierarchyIRI",
                    inDimension: dimension.name,
                    levels: [
                        {
                            inDimension:"dimensionIRI",
                            inHierarchy:"hierarchyIRI",
                            name:"levelIRI",
                            parentLevel:"levelIRI",
                            rollupRelation:"rollupRelationIRI", //could be null
                            rollUpSerial: [
                                {
                                    inDimension:"dimensionIRI",
                                    inHierarchy:"hierarchyIRI",
                                    name:"levelIRI",
                                    parentLevel:"levelIRI",
                                    rollupRelation:"rollupRelationIRI", //could be null
                                }
                            ]
                        }

                    ]
                }
            ]
        ]
    }
}
*/

/*
datasetInitialState.selectedLevelData = {
    levelName: "",
    attributes:[
        {
            attributeName:"",
            prefixIRI:"",
            attributeValues:[
                {
                    type: 'literal', 
                    value: '1'
                },
                {
                    type: 'uri',
                    value:'namespace.com/something' 
                }
            ]
        }
    ]
}
*/







// Query Selection

/*
selectionForQueryState.selectedMeasures: [
    {
        measureName: "namespace.com/Country",
        measurePrefixName: "mdProperty:Country",
        range:'namespace.com/range',
        aggFunctions: [
            { aggFuncName: "namespace.com/avg", prefixName: "qb4o:avg" }
        ]
    }
]
*/


/*
selectionForQueryState.selectedLevels: [
    {
        "levelName": "",
        "prefixName": "",
        "attributesToBeViewed": [
            {
                "attributeName": "",
                "prefixName": ""
            }
        ],
        "selectedInstances": [
            {
                "attributeName": "",
                prefixIRI:"",
                "instances": [
                    {
                        "type": "",
                        "value": ""
                    }
                ]
            }
        ]
    }
]
*/
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

    return NextResponse.json({treeStructure:data });
}


// export default handler;
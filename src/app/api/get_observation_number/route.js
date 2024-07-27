import { NextResponse } from 'next/server'

const SparqlClient = require("../sparqlClient/SparqlClient")



export async function POST (request=Request) {
    const {tbox,abox,dataset} = await request.json()

    const client = new SparqlClient()
    const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + `SELECT (count(?o) AS ?numobs)\n`
        + `FROM<${tbox}>\nFROM<${abox}>\n`
        + `WHERE { ?o a qb:Observation;
        <http://purl.org/linked-data/cube#dataSet> <${dataset}>.}`

    const result = await client.query(sparql)
    const data = result.data.results.bindings[0].numobs.value

    return NextResponse.json({totalObservations:data });
}


// export default handler;
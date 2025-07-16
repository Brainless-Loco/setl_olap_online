import { NextResponse } from 'next/server'
import { splitIRI } from "@/lib/custom/helper"

const SparqlClient = require("../sparqlClient/SparqlClient")



export async function POST (request=Request) {
    const {tbox,dataset} = await request.json()

    const client = new SparqlClient()
    const sparql_prev = `PREFIX qb:	<http://purl.org/linked-data/cube#>\n`
        + `prefix qb4o: <http://purl.org/qb4olap/cubes#>\n`
        + `prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n`
        + `prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n\n`
        + `SELECT DISTINCT ?measure ?range ?aggFunc\n`
        + `FROM<${tbox}>\n`
        + `WHERE {\n`
        + `\t<${dataset}> rdf:type qb:DataSet;\n`
        + `\t\tqb:structure ?cuboid.\n`
        + `\t?cuboid qb:component ?BNodeForMeasure.\n`
        + `\t?BNodeForMeasure qb:measure ?measure;\n`
        + `\t\tqb4o:aggregateFunction ?aggFunc.\n`
        + `\t?measure rdfs:range ?range`
        + `}\n`
        + `ORDER BY ?measure`;


      const sparql =  `
PREFIX qb:     <http://purl.org/linked-data/cube#>
PREFIX qb4o:   <http://purl.org/qb4olap/cubes#>
PREFIX qb4oe:  <http://example.org/qb4olap-ext#>
PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?measure ?range ?aggFunc ?additivity ?dimension
FROM <${tbox}>
WHERE {
  <${dataset}> qb:structure/qb:component ?comp .
  
  ?comp qb:measure ?measure ;
        qb4o:aggregateFunction ?aggFunc .

  ?measure rdfs:range ?range .

  {
    # Global NonAdditive (no dimension)
    ?measure qb4oe:additivity qb4oe:NonAdditive .
    BIND(qb4oe:NonAdditive AS ?additivity)
  }
  UNION
  {
    # Dimension-specific SemiAdditive
    ?measure qb4oe:additivityOver ?context .
    ?context qb4oe:dimension ?dimension ;
             qb4oe:additivityType qb4oe:SemiAdditive .
    BIND(qb4oe:SemiAdditive AS ?additivity)
  }
}
ORDER BY ?measure ?dimension

      `

        // console.log(sparql)
    const result = await client.query(sparql)
    const data = result.data.results.bindings
    return NextResponse.json({Measures:mergeMeasures(data)});
}

const mergeMeasures_prev = (data) => {
    const mergedData = data.reduce((acc, item) => {
      const measureUrl = item.measure.value;
      const aggFuncUrl = item.aggFunc.value;
      const rangeUrl = item.range.value;
  
      // Find the measure in the accumulator
      let measure = acc.find(m => m.measureName === measureUrl);
  
      if (!measure) {
        // If the measure doesn't exist, create a new entry
        measure = {
          measureName: measureUrl,
          range:{
            rangeName: rangeUrl,
            rangeValue: splitIRI(rangeUrl)[1]
          },
          aggFunctions: []
        };
        acc.push(measure);
      }
  
      // Add the aggregation function to the measure's aggFunctions array
      measure.aggFunctions.push({
        aggFuncName: aggFuncUrl
      });
  
      return acc;
    }, []);
  
    return mergedData ;
  };
  

const mergeMeasures = (data) => {
  const mergedData = data.reduce((acc, item) => {
    const measureUrl = item.measure.value;
    const aggFuncUrl = item.aggFunc.value;
    const rangeUrl = item.range.value;

    const dimensionUrl = item.dimension?.value;
    const additivityType = item.additivity?.value;

    // Find existing measure
    let measure = acc.find(m => m.measureName === measureUrl);

    if (!measure) {
      // Initialize new measure
      measure = {
        measureName: measureUrl,
        range: {
          rangeName: rangeUrl,
          rangeValue: splitIRI(rangeUrl)[1]
        },
        aggFunctions: [],
        additivityInfo: {
          semiAdditiveDims: [],
          nonAdditive: false
        }
      };
      acc.push(measure);
    }

    // Add aggregation function
    if (!measure.aggFunctions.some(f => f.aggFuncName === aggFuncUrl)) {
      measure.aggFunctions.push({ aggFuncName: aggFuncUrl });
    }

    // Handle additivity info
    if (additivityType) {
      const additivityLocalName = splitIRI(additivityType)[1];

      if (additivityLocalName === "NonAdditive") {
        measure.additivityInfo.nonAdditive = true;
      } else if (additivityLocalName === "SemiAdditive" && dimensionUrl) {
        if (!measure.additivityInfo.semiAdditiveDims.includes(dimensionUrl)) {
          measure.additivityInfo.semiAdditiveDims.push(dimensionUrl);
        }
      }
    }

    return acc;
  }, []);

  return mergedData;
};


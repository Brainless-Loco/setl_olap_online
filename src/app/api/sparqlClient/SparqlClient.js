import axios from "axios"
const { default: getIPV4 } = require("./LocalIP")

module.exports = class SparqlClient {
    constructor(endpoint, user, password) {
        this.user = user ?? 'dba'

        // this.password = password ?? 'dba'
        // this.endpoint = endpoint ?? `http://${getIPV4()}:8890/sparql`
        
        this.password = password ?? 'rudra19701066'
        this.endpoint = endpoint ?? `http://bike-csecu.com:8890/sparql`

        // this.password = password ?? 'dba'
        // this.endpoint = endpoint ?? `http://bike-csecu.com:8892/sparql`

        // this.password = password ?? 'dba'
        // this.endpoint = endpoint ?? `http://bike-csecu.com:8893\/sparql`
    }

    async query(sparql) {
        // Build the request handler
        const handler = axios.create({
            baseURL: this.endpoint,
            auth: {
                username: this.user,
                password: this.password
            }
        })

        const params = new URLSearchParams();
        params.append("query", sparql);
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/sparql-results+json,text/turtle",
            },
        };
        const response = await handler.post("", params, config);
        // console.log(response)
        return response;
    }
}
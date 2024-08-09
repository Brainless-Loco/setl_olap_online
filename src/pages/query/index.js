"use client"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react'
import { Editor } from '@monaco-editor/react';

export default function index() {
    const [sparqlCode, setSparqlCode] = useState('# Write your spraql code here...');
    const [loading, setLoading] = useState(false)
    const [resultGenTime, setResultGenTime] = useState(0)
    const [resultData, setResultData] = useState([])
    const [resultsTabOpen, setResultsTabOpen] = useState(false)



    const fetchResults = async ()=>{
        setLoading(true)
        setResultsTabOpen(true)
        const startTime = Date.now();
        const response = await fetch('/api/get_query_result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sparql:sparqlCode})
        });
        if (!response) {
            alert('Network response was not ok');
        }
        const endTime = Date.now();

        setResultGenTime(endTime-startTime)
        const {data} = await response.json();
        setResultData(data)
        setLoading(false)
    }
    

    return (
        <Box>
            <Box sx={{border:'1px solid #c2c4c2',height:'80vh',borderRadius:'8px',overflow:'hidden',marginX:'8px'}}>
                    <Editor
                        defaultLanguage="sparql"
                        value={sparqlCode}
                        onChange={(v,e)=>{setSparqlCode(v)}}
                        disabled
                        />
                        
            </Box>
            <Box className="flex justify-center items-center">
                    <Button 
                        disabled={false}
                        sx={{backgroundColor:'#0d4d15',width:'auto',padding:'14px',margin:'auto',color:'white',borderRadius:'5px',fontWeight:'bold',border:'2px solid transparent',
                    '&:hover': 
                        {
                        border:'2px solid #0d4d15',
                        background: "white",
                        color:'#0d4d15'
                        },
                    }}
                    onClick={fetchResults}
                    
                    >Run Query</Button>
            </Box>
            

            
        </Box>
    )
}

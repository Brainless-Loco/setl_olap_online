import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import CodeIcon from '@mui/icons-material/Code';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeModal from '../GeneratedSparqlCode/CodeModal';
import { useEffect, useState } from 'react';

export default function ActionButtonGroup() {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState(`# Your Sparql Code is loading....`)
    const [disableActionBtns, setDisableActionBtns] = useState(true)

    
    const everyThingForQuery = useSelector(state=>state.queryReducer)


    const fetchSparqlQuery = async () => {
        setLoading(true)
        setOpen(true)
        const response = await fetch('/api/get_sparql_query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(everyThingForQuery)
        });
      
        if (!response) {
          throw new Error('Network response was not ok');
        }

        const {query} = await response.json();
        setLoading(false)
        setQuery(query)
      };
    

    useEffect(() => {
      
        if(everyThingForQuery.selectedMeasures.length >0 && JSON.stringify(everyThingForQuery.selectedLevels)!=="{}"){
            setDisableActionBtns(false)
        }
        else{
            setDisableActionBtns(true)
        }
    }, [everyThingForQuery])
    


    return (
        <Box className='w-full min-h-20 flex justify-center items-center'>
            <Button 
                disabled={disableActionBtns} 
                startIcon={<CodeIcon/>} 
                onClick={()=>{fetchSparqlQuery()}}
                className='h-full py-4 px-6 font-bold mx-8 text-cyan-950 border-4 border-cyan-950 transition duration-400' 
                sx={{':hover':{borderWidth:'4px', borderColor:'transparent',backgroundColor:'#d3dde8'}}} 
                variant="outlined">
                Generate Query
            </Button>
            <Button 
                disabled={disableActionBtns} 
                startIcon={<PlayArrowIcon/>} 
                className='h-full py-4 px-6 font-bold mx-8 text-cyan-950 border-4 border-cyan-950 transition duration-400' 
                sx={{':hover':{borderWidth:'4px', borderColor:'transparent',backgroundColor:'#d3dde8'}}} 
                variant="outlined">
                Execute Query
            </Button>
            <CodeModal query={query} open={open} setOpen={setOpen} loading={loading} />
        </Box>
    )
}

import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from "react"

const FileListTab = ({ }) => {
    const [graphs, setGraphs] = useState([])

    
    const [abox, setAbox] = useState('')
    const [tbox, setTbox] = useState('')

    const handleABoxChange = (e) => {
        setAbox(e.target.value)
    }

    const handleTBoxChange = (e) => {
        setTbox(e.target.value)
    }

    const getGraphList = async () => {
        const res = await fetch('/api/get_graph_list', {method: "POST"})
        if(res){
            const data = await res.json()
            const graphNames = data.graphNames
            setGraphs(graphNames)
        }
        else{
            console.log("couldn't fetch the graphs...")
        }
        
    }

    useEffect(() => {
        getGraphList();
    }, [])

    return (
        <Box sx={{width: 'auto',display:'flex',justifyContent:'center',flexDirection:'column',flexWrap:'wrap',}}>
            <FormControl fullWidth sx={{ marginY: '10px'}}>
                <InputLabel id='filter-cond-label' sx={{fontSize:'12px'}}>TBox IRI</InputLabel>
                <Select
                    labelId="filter-cond-select"
                    sx={{ height:'40px',}}
                    label='TBox IRI'
                    value={tbox}
                    onChange={handleTBoxChange}
                    defaultValue=''>
                    {graphs.map((item, idx) => (
                        <MenuItem key={`tbox_${idx}`} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                <InputLabel id='filter-cond-label' sx={{fontSize:'12px'}}>ABox IRI</InputLabel>
                <Select
                    labelId="filter-cond-select"
                    sx={{height:'40px' }}
                    label='ABox IRI'
                    value={abox}
                    onChange={handleABoxChange}
                    defaultValue=''>
                    {graphs.map((item, idx) => (
                        <MenuItem key={`abox_${idx}`} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            {/* <Button className="extractBtn" fullWidth variant='contained' onClick={() => onExtractDataset(abox, tbox)} type="button" 
            disabled={!tbox.length || !abox.length} >
                Extract Datasets
            </Button> */}
        </Box>
    )
}

export default FileListTab
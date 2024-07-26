import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment, update_ABox, update_TBox } from "@/lib/redux/action"

const FileListTab = ({}) => {

    const dispatch = useDispatch();

    const tbox = useSelector((state) => state.datasetReducer.tbox);
    const abox = useSelector((state) => state.datasetReducer.abox);

    const [graphs, setGraphs] = useState([])
    
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

    console.log(tbox)

    return (
        <Box sx={{width: 'auto',display:'flex',justifyContent:'center',flexDirection:'column',flexWrap:'wrap'}}>
            <FormControl fullWidth sx={{ marginY: '10px'}}>
                <InputLabel id='filter-cond-label' sx={{fontSize:'12px'}}>TBox IRI</InputLabel>
                <Select
                    labelId="filter-cond-select"
                    sx={{ height:'40px',}}
                    label='TBox IRI'
                    value={tbox}
                    onChange={(e)=>dispatch(update_TBox(e.target.value))}
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
                    onChange={(e)=>dispatch(update_ABox(e.target.value))}
                    defaultValue=''>
                    {graphs.map((item, idx) => (
                        <MenuItem key={`abox_${idx}`} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <Button className="extractBtn" fullWidth variant='contained' 
            onClick={() => dispatch(increment(5))} type="button" 
            disabled={!tbox.length || !abox.length} >
                Extract Datasets
            </Button>
        </Box>
    )
}

export default FileListTab
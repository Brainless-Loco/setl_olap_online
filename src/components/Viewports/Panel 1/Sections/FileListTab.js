import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update_ABox, update_dataset_list, update_TBox } from "@/lib/redux/action"
import { Typography } from "@mui/material"

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

    const getDatasetList = async()=>{
        const res = await fetch('/api/get_dataset_list', {
            method: "POST",
            body:JSON.stringify({tbox:tbox})}
        )
        if(res){
            const data = await res.json()
            console.log(data.datasetList)
            dispatch(update_dataset_list(data.datasetList))
        }
        else{
            console.log("couldn't fetch the dataset list...")
        }
    }

    useEffect(() => {
        getGraphList();
    }, [])

    return (
        <Box sx={{width: 'auto',display:'flex',justifyContent:'center',flexDirection:'column',flexWrap:'wrap',gap:'5px'}}>
            <FormControl fullWidth>
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
            <Box hidden={tbox.length>0 && abox.length>0}>
                <Typography sx={{color:'#08094f',fontSize:'12px',fontWeight:'bold',textAlign:'center'}}> 
                    Select a TBox and an ABox to extract dataset(s).
                </Typography>
            </Box>
            
            <Button className="extractBtn" fullWidth variant='contained' 
            onClick={() => getDatasetList()} type="button" 
            disabled={!tbox.length || !abox.length} >
                Extract Datasets
            </Button>
        </Box>
    )
}

export default FileListTab
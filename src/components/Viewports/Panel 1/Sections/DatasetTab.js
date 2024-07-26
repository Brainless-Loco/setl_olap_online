import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography'
import { useEffect, useState } from "react"
import Button  from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dimension from "@/components/TreeStructure/Dimension"
import { useDispatch, useSelector } from "react-redux"
import { update_dataset } from "@/lib/redux/action"


const DatasetTab = ({}) => {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    const dataset = useSelector((state) => state.datasetReducer.dataset)
    const datasetList = useSelector((state) => state.datasetReducer.datasetList)

    const dispatch = useDispatch()

    

    return (
        <Box hidden={datasetList.length<1} sx={{width: '100%'}}>
            <FormControl fullWidth className="mt-5">
                <InputLabel id='dataset-label' sx={{fontSize:'90%',verticalAlign:'middle',top:'-10%'}}>Datasets</InputLabel>
                <Select
                    labelId="dataset-select"
                    sx={{width:'100%',height:'40px',marginBottom:'10px'}}
                    label='Dataset'
                    value={dataset}
                    onChange={(e)=>dispatch(update_dataset(e.target.value))}>

                    {datasetList.map((item, idx) => (
                        <MenuItem key={`dataset_${idx}`} value={item}>dataset:{item}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <Box hidden={!loading}>
                Dimensions
                <Dimension/>
                <Dimension/>
            </Box>
            {/* {
                loading&& <Box sx={{height:'100px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <CircularProgress sx={{color:'#08094f'}}/>
                </Box>
            } */}
             
    </Box>
    )
}

export default DatasetTab
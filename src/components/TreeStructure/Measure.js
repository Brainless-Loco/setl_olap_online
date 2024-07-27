import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from "react-redux";
import { add_to_prefix_list } from "@/lib/redux/action";
import AggFunction from "./AggFunction";

export default function Measure({info}) {
    const dispatch = useDispatch()

    const [aggFuncShow, setAggFuncShow] = useState(false)
    const [measureName, setMeasureName] = useState('')

    
    const prefixes = useSelector((state) => state.datasetReducer.prefixes);

    const update_measure_name_prefix = ()=>{
        const splittedName = info.measureName.split('#')
        var tempPrefixes = JSON.parse(JSON.stringify(prefixes))
        var tempID = ''
        if(splittedName[0] in tempPrefixes !== true){

            tempPrefixes[splittedName[0]] =  "mdProperty"+tempID;
            tempPrefixes["mdProperty"+tempID] =  splittedName[0];
            
            setMeasureName("mdProperty"+tempID+":"+splittedName[1]);
            if(tempID === '') tempID = 1;
            else tempID++;
        }
        else{
            setMeasureName(tempPrefixes[splittedName[0]]+":"+splittedName[1]);
        }
        dispatch(add_to_prefix_list(tempPrefixes))
    }

    useEffect(() => {
      if(info && info.measureName.length>0) update_measure_name_prefix()
    }, [info])
    

  return (
        <Box sx={{borderColor:'gray',borderLeftWidth:'2px'}}>
            <Box onClick={()=>setAggFuncShow(!aggFuncShow)} sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',cursor:'pointer'}}>
                <Box className='w-11/12'>__    
                    {measureName}
                </Box>
                <Box  className='w-1/12 text-center'>
                   <KeyboardArrowDownIcon/>
                </Box>
            </Box>
            <Box sx={{paddingLeft:'15px'}} hidden={!aggFuncShow}>
                <small>Aggregate Functions</small>
                {
                    info && info.measureName.length>0 && info.aggFunctions.map(A=>(
                        <AggFunction key={A.aggFuncName} info={A}/>
                    ))
                    
                }
            </Box>
        </Box>
  )
}



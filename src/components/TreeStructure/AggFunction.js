import { add_to_prefix_list } from "@/lib/redux/action";
import Box from "@mui/material/Box"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AggFunction({info}) {

    const dispatch = useDispatch()

    const [aggFuncName, setAggFuncName] = useState('')

    const prefixes = useSelector((state) => state.datasetReducer.prefixes);

    const update_aggFunc_name_prefix = ()=>{
        const splittedName = info.aggFuncName.split('#')
        var tempPrefixes = JSON.parse(JSON.stringify(prefixes))
        var tempID = ''
        if(splittedName[0] in tempPrefixes !== true){

            tempPrefixes[splittedName[0]] =  "qb4o"+tempID;
            tempPrefixes["qb4o"+tempID] =  splittedName[0];
            
            setAggFuncName("qb4o"+tempID+":"+splittedName[1]);
            if(tempID === '') tempID = 1;
            else tempID++;
        }
        else{
            setAggFuncName(tempPrefixes[splittedName[0]]+":"+splittedName[1]);
        }
        dispatch(add_to_prefix_list(tempPrefixes))
    }

    useEffect(() => {
        if(info && info.aggFuncName.length>0) update_aggFunc_name_prefix()
      }, [info])

    return (
        <Box>
            <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',cursor:'pointer'}}>
                <Box  className='w-full'  sx={{position:'relative',borderColor:'gray',borderLeftWidth:'2px'}}>
                    <span style={leftLine}></span>
                    {/* <span style={leftCircle}></span> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {aggFuncName}
                </Box>
            </Box>
        </Box>
    )
}

const leftLine = {
    position:'absolute',
    backgroundColor:'gray',
    height:'2px',
    width:'5%',
    top:'45%',
    left:'0%'
}

const leftCircle = {
    position:'absolute',
    backgroundColor:'gray',
    height:'7px',
    width:'7px',
    borderRadius:'50%',
    top:'28%',
    left:'-24%'
}
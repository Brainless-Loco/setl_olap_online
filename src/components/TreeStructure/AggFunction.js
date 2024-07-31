import { add_to_prefix_list, update_selected_measure_list } from "@/lib/redux/action";
import Box from "@mui/material/Box"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AggFunction({info, measureInfo}) {

    const dispatch = useDispatch()

    const [aggFuncName, setAggFuncName] = useState('')

    const prefixes = useSelector((state) => state.datasetReducer.prefixes);

    const selected_measures = useSelector((state) => state.queryReducer.selectedMeasures);

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
    
    const update_agg_function_selection = ()=>{
        let measureFound = false;
        let aggFuncFound = false;

        const { measureName, measurePrefixName } = measureInfo;

        const updatedMeasures = selected_measures.map(measure => {
            if (measure.measurePrefixName === measurePrefixName) {
                measureFound = true;
                // Create a new array for aggFunctions to avoid mutation
                const newAggFunctions = measure.aggFunctions.filter(aggFunc => {
                    if (aggFunc.prefixName === aggFuncName) {
                        aggFuncFound = true;
                        return false; // Remove the existing aggFunc
                    }
                    return true; // Keep other aggFuncs
                });
                if (!aggFuncFound) {
                    // If aggFunc not found, add the new aggFunc
                    newAggFunctions.push({ "aggFuncName": info.aggFuncName, "prefixName": aggFuncName });
                }
                return { ...measure, aggFunctions: newAggFunctions };
            }
            return measure;
        }).filter(m => m.aggFunctions.length > 0); // Remove the measure if it has no aggFunctions

        if (!measureFound) {
            // If measure not found, add the new measure with the aggFunc
            updatedMeasures.push({
                measureName,
                measurePrefixName,
                aggFunctions: [{ "aggFuncName": info.aggFuncName, "prefixName": aggFuncName }]
            });
        }
        dispatch(update_selected_measure_list(updatedMeasures));
    }

    useEffect(() => {
        if(info && info.aggFuncName.length>0) update_aggFunc_name_prefix()
      }, [info])


    return (
        <Box onClick={update_agg_function_selection} className="flex w-full flex-wrap justify-between cursor-pointer">
            <Box  className='w-full relative'  sx={{borderColor:'gray',borderLeftWidth:'2px'}}>
                <span style={leftLine}></span>
                {/* <span style={leftCircle}></span> */}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {aggFuncName}
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
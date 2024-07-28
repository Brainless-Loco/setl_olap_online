import { add_to_prefix_list, update_selected_level_data } from '@/lib/redux/action'
import Box from '@mui/material/Box'
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AttributeListTab() {

    const dispatch = useDispatch()
    
    const [levelName, setLevelName] = useState('')
    const [selectedAttribute, setSelectedAttribute] = useState({originalIRI:'',prefixIRI:''})
    const [selectedAttributeInstances, setSelectedAttributeInstances] = useState([])

    const selectedLevelData = useSelector((state) => state.datasetReducer.selectedLevelData);
    
    const prefixes = useSelector((state) => state.datasetReducer.prefixes)
    
    
    const filterConditions = ['Equal to (=)', 'Not Equal to (!=)',
        'Greater Than (>)', 'Greater or Equal (>=)',
        'Less Than (<)', 'Less or Equal (<=)'
    ]

    const update_level_name_prefix = ()=>{
        const splittedName = selectedLevelData.levelName.split('#')
        setLevelName(prefixes[splittedName[0]]+":"+splittedName[1]);
    }

    const update_attribute_name_prefix = ()=>{
        if(selectedLevelData.attributes[0].prefixIRI) return;
        const tempAttributeList = []
        var tempPrefixes = JSON.parse(JSON.stringify(prefixes))
        var tempID = ''

        selectedLevelData.attributes.forEach((a,idx)=>{
            const splittedName = a.attributeName.split('#')
            if(splittedName[0] in tempPrefixes !== true){
                tempPrefixes[splittedName[0]] =  "mdAttribute"+tempID;
                tempPrefixes["mdAttribute"+tempID] =  splittedName[0];
                tempAttributeList.push({
                    ...a,
                    prefixIRI: "mdAttribute"+tempID + ":" + splittedName[1]
                })
                if(tempID === '') tempID = 1;
                else tempID++;
            }
            else{
                tempAttributeList.push({
                    ...a,
                    prefixIRI: tempPrefixes[splittedName[0]]+":"+splittedName[1]
                })
            }
        })
        dispatch(add_to_prefix_list(tempPrefixes))
        dispatch(update_selected_level_data({...selectedLevelData,attributes:tempAttributeList}))
    }


    useEffect(() => {
      if(selectedLevelData && selectedLevelData.levelName){ 
        update_level_name_prefix()
        update_attribute_name_prefix()
      }
    }, [selectedLevelData])
    

    console.log(selectedAttribute)

    return (
        <Box className="w-full">
            <Typography sx={{color:'#08094f',fontSize:'14px'}}>
                Selected level: <b>{selectedLevelData && levelName.length>0 && levelName}</b>
            </Typography>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id='level-attribute-label' sx={{fontSize:'90%',top:'-10%'}}>Attributes</InputLabel>
                <Select
                    labelId="level-attribute-select"
                    sx={{width:'100%',height:'40px'}}
                    label='Level Attribute'
                    value={selectedAttribute.originalIRI+'&&'+selectedAttribute.prefixIRI}
                    onChange={(e)=>{
                        setSelectedAttribute({
                            originalIRI:e.target.value.split('&&')[0],
                            prefixIRI: e.target.value.split('&&')[1]
                        })}}
                    defaultValue={"Select a property"}>
                    {
                        selectedLevelData && selectedLevelData.attributes && selectedLevelData.attributes[0].prefixIRI && selectedLevelData.attributes.map((a, idx) => (
                            <MenuItem name={a.prefixIRI} key={a.attributeName} value={a.attributeName+'&&'+a.prefixIRI}>{a.prefixIRI}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id='filter-cond-label'>Filter Conditions</InputLabel>
                <Select
                    labelId="filter-cond-select"
                    sx={{ width: '100%',height:'40px' }}
                    label='Filter Condition'
                    value={filterConditions[0]}
                    onChange={()=>{}}
                    defaultValue={filterConditions[0]}>
                    {
                        filterConditions.map((item, idx) => (
                            idx? 
                            <MenuItem disabled key={`level_prop_${idx}`} value={item}>{item}</MenuItem>:
                            <MenuItem key={`level_prop_${idx}`} value={item}>{item}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id='level-prop-label' sx={{fontSize:'90%',top:'-10%'}}>To Be Viewed Property</InputLabel>
                <Select
                    labelId="level-prop-to-be-viewed"
                    sx={{ width: '100%',height:'40px' }}
                    label='Level Property to be viewed'
                    value={''}
                    onChange={()=>{}}
                    defaultValue={"Select a property"}>
                    {
                        // levelAttributes.map((item, idx) => (
                        //     <MenuItem key={`level_prop_${idx}`} value={item.name}>mdAttribute:{item.name}</MenuItem>
                        // ))
                    }
                </Select>
            </FormControl>
    </Box>
  )
}

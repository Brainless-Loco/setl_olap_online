import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography'
import { useEffect, useState } from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Dimension from "@/components/TreeStructure/Dimension"
import { useDispatch, useSelector } from "react-redux"
import { update_dataset, update_dimension_tree, update_total_num_of_observations } from "@/lib/redux/action"
import { CircularProgress } from "@mui/material"


const DatasetTab = ({}) => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const tbox = useSelector((state) => state.datasetReducer.tbox);
    const abox = useSelector((state) => state.datasetReducer.abox);
    const dataset = useSelector((state) => state.datasetReducer.dataset)
    const datasetList = useSelector((state) => state.datasetReducer.datasetList)
    const totalNumOfObservations = useSelector((state) => state.datasetReducer.totalNumOfObservations)
    const prefixes = useSelector((state) => state.datasetReducer.prefixes)
    
    const treeStructures = useSelector((state) => state.datasetReducer.treeStructures)

    const getNumOfObservations = async()=>{
        const splittedDataset = dataset.split(':')
        var datasetIRI = prefixes[splittedDataset[0]]+'#'+splittedDataset[1]
        const res = await fetch('/api/get_observation_number', {
            method: "POST",
            body:JSON.stringify({tbox:tbox,abox:abox,dataset:datasetIRI})}
        )
        if(res){
            const data = await res.json()
            
            dispatch(update_total_num_of_observations(data.totalObservations))

        }
        else{
            console.log("couldn't fetch the number of Observations...")
        }
    }

    const mergeResults = (data) => {
        const mergedData = {};

        // Step 1: Merge data into a hierarchical structure
        data.forEach(item => {
            const dimensionUrl = item.dimension.value;
            const hierarchyUrl = item.hierarchy.value;

            if (!mergedData[dimensionUrl]) {
            mergedData[dimensionUrl] = {
                name: dimensionUrl,
                hierarchies: {}
            };
            }

            if (!mergedData[dimensionUrl].hierarchies[hierarchyUrl]) {
                mergedData[dimensionUrl].hierarchies[hierarchyUrl] = {
                    name: hierarchyUrl,
                    levels: {}
                };
            }

            mergedData[dimensionUrl].hierarchies[hierarchyUrl].levels[item.child.value] = {
                name: item.child.value,
                parentLevel: item.parent.value,
                rollupRelation: item.rollupProperty.value
            };

            // Also add the parent level if not already added (to ensure all levels are present)
            if (!mergedData[dimensionUrl].hierarchies[hierarchyUrl].levels[item.parent.value]) {
            mergedData[dimensionUrl].hierarchies[hierarchyUrl].levels[item.parent.value] = {
                name: item.parent.value,
                parentLevel: null, // Parent level's parent is not known at this point
                rollupRelation: null
            };
            }
        });

        // Step 2: Sort levels within each hierarchy
        Object.values(mergedData).forEach(dimension => {
            Object.values(dimension.hierarchies).forEach(hierarchy => {
            const levelsMap = hierarchy.levels;
            const levels = Object.values(levelsMap);

            // Create a map of child to parent
            const parentMap = {};
            levels.forEach(level => {
                if (level.parentLevel) {
                parentMap[level.name] = level.parentLevel;
                }
            });

            // Find the root levels (levels that are not a child of any other level)
            const rootLevels = levels.filter(level => !Object.values(parentMap).includes(level.name));

            // Sort levels starting from the root level
            const sortedLevels = [];
            const visited = new Set();

            const addLevel = (level) => {
                if (!visited.has(level.name)) {
                    visited.add(level.name);
                    sortedLevels.push(level);
                    const children = levels.filter(l => l.parentLevel === level.name);
                    children.forEach(addLevel);
                }
            };

            rootLevels.forEach(addLevel);
            levels.forEach(addLevel);

            
            hierarchy.levels = sortedLevels.reverse();
            });
        });

        // Convert mergedData to the desired structure
        const result = {
            dimension: Object.values(mergedData).map(dimension => ({
            name: dimension.name,
            hierarchies: Object.values(dimension.hierarchies).map(hierarchy => ({
                name: hierarchy.name,
                levels: hierarchy.levels
            }))
            }))
        };
        return result
    }

    const getTreeStructure = async ()=>{ 
        setLoading(true) 
        const splittedDataset = dataset.split(':')
        var datasetIRI = prefixes[splittedDataset[0]]+'#'+splittedDataset[1]
        if(treeStructures && 
            treeStructures.datasetIRI){
                setLoading(false)
                return  
        }

        const res = await fetch('/api/get_dimension_tree', {
            method: "POST",
            body:JSON.stringify({tbox:tbox,abox:abox,dataset:datasetIRI})}
        )
        if(res){
            const data = await res.json()
            const dimensionTree = mergeResults(data.treeStructure)
            dispatch(update_dimension_tree({...treeStructures, [datasetIRI]:dimensionTree}))
        }
        else{
            console.log("couldn't fetch the tree structure...")
        }
        setLoading(false)
    }

    console.log(treeStructures)

    useEffect(() => {
        if(dataset.length>0) {
            getNumOfObservations()
            getTreeStructure()
        }
    }, [dataset])

    return (
        <Box hidden={datasetList.length<1} sx={{width: '100%',marginTop:'5px'}}>
            <small>Total Number of Observations: {totalNumOfObservations}</small>
            <FormControl fullWidth className="mt-5">
                <InputLabel id='dataset-label' sx={{fontSize:'90%',verticalAlign:'middle',top:'-10%'}}>Datasets</InputLabel>
                <Select
                    labelId="dataset-select"
                    sx={{width:'100%',height:'40px',marginBottom:'10px'}}
                    label='Dataset'
                    value={dataset}
                    onChange={(e)=>dispatch(update_dataset(e.target.value))}>

                    {datasetList.map((item, idx) => (
                        <MenuItem key={`dataset_${idx}`} value={item}>{item}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <Box>
                Dimensions
                {
                    dataset.length>0 && treeStructures[prefixes[dataset.split(':')[0]]+'#'+dataset.split(':')[1]] && treeStructures[prefixes[dataset.split(':')[0]]+'#'+dataset.split(':')[1]].dimension.map(d=>(
                        <Dimension key={d.name} info={d}/>
                    ))
                    
                }
            </Box>
            {
                loading && <Box sx={{height:'100px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <CircularProgress sx={{color:'#08094f'}}/>
                </Box>
            }
             
    </Box>
    )
}

export default DatasetTab
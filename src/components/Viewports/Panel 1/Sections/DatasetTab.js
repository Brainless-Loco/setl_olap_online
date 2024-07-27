import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography'
import { useEffect, useState } from "react"
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Dimension from "@/components/TreeStructure/Dimension"
import { useDispatch, useSelector } from "react-redux"
import { update_dataset, update_dimension_tree, update_measure_list, update_total_num_of_observations } from "@/lib/redux/action"
import { CircularProgress } from "@mui/material"
import Measure from "@/components/TreeStructure/Measure"


const DatasetTab = ({}) => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const tbox = useSelector((state) => state.datasetReducer.tbox);
    const abox = useSelector((state) => state.datasetReducer.abox);
    const dataset = useSelector((state) => state.datasetReducer.dataset)
    const datasetList = useSelector((state) => state.datasetReducer.datasetList)
    const totalNumOfObservations = useSelector((state) => state.datasetReducer.totalNumOfObservations)

    const prefixes = useSelector((state) => state.datasetReducer.prefixes)
    
    const treeStructures = useSelector((state) => state.datasetReducer.treeStructures)

    const measuresList = useSelector((state) => state.datasetReducer.measuresList);

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
            const dimensionTree = data.treeStructure
            dispatch(update_dimension_tree({...treeStructures, [datasetIRI]:dimensionTree}))
        }
        else{
            console.log("couldn't fetch the tree structure...")
        }
        setLoading(false)
    }

    const getMeasureList = async () =>{
        setLoading(true) 
        const splittedDataset = dataset.split(':')
        var datasetIRI = prefixes[splittedDataset[0]]+'#'+splittedDataset[1]
        if(measuresList && 
            measuresList.datasetIRI){
                setLoading(false)
                return  
        }

        const res = await fetch('/api/get_measure_list', {
            method: "POST",
            body:JSON.stringify({tbox:tbox,dataset:datasetIRI})}
        )
        if(res){
            const data = await res.json()
            dispatch(update_measure_list({...measuresList, [datasetIRI]:data}))
        }
        else{
            console.log("couldn't fetch the tree structure...")
        }
        setLoading(false)
    }

    
    console.log(measuresList)


    useEffect(() => {
        if(dataset.length>0) {
            getNumOfObservations()
            getTreeStructure()
            getMeasureList()
        }
    }, [dataset])

    return (
        <Box sx={{width: '100%',marginTop:'5px'}}>
            <small>Total Number of Observations: {totalNumOfObservations}</small>
            <FormControl fullWidth className="mt-5">
                <InputLabel id='dataset-label' sx={{fontSize:'90%',verticalAlign:'middle',top:'-10%'}}>Datasets</InputLabel>
                <Select
                    disabled={datasetList.length<1}
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
                <b>Dimensions</b>
                {
                    dataset.length>0 && treeStructures[prefixes[dataset.split(':')[0]]+'#'+dataset.split(':')[1]] && treeStructures[prefixes[dataset.split(':')[0]]+'#'+dataset.split(':')[1]].dimension.map(d=>(
                        <Dimension key={d.name} info={d}/>
                    ))
                    
                }
            </Box>
            <Box>
                <b>Measures</b>
                {
                   dataset.length>0 && measuresList[prefixes[dataset.split(':')[0]]+'#'+dataset.split(':')[1]] && measuresList[prefixes[dataset.split(':')[0]]+'#'+dataset.split(':')[1]].Measures.map(m=>(
                        <Measure key={m.measureName} info={m}/>
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
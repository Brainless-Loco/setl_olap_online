import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import FileListTab from "./Sections/FileListTab"
// import DatasetTab from "../../Tabs/DatasetTab"


const Viewport1 = ({

    }) => {

    

    return (
        <Box >
            <Card>
                <CardHeader title='Structure Extraction' sx={{color:'#08094f',marginBottom:'0px',paddingBottom:'0px',paddingTop:'5px'}}/>
                <CardContent style={flexSetting}>
                    <Box sx={{ height: 'auto', overflowY: 'auto',width:'100%'}}>
                        <FileListTab/>
                    </Box>
                    {/* <DatasetTab
                            onSelectDataset={onSelectDataset}
                            aboxIRI={aboxIRI}
                            datasetArray={datasetArray}
                            onExtractCubes={onExtractCubes}
                            onLevelPropSelect={onLevelPropSelect}
                            onMeasureAggrFuncSelect={onMeasureAggrFuncSelect}
                            addAggFunc={addAggFunc}
                            dialogData = {dialogData}
                            dimensionTree={dimensionTree}
                            setDialogData={setDialogData}
                            /> */}
                    
                </CardContent>
            </Card>
        </Box>
        
    )
}

const flexSetting = {
    display:'flex',
    justifyContent:'center',
    flexWrap:'wrap',
    flexDirection:'row',
    width:'100%',
    maxHeight:'100vh',
    overflowY:'auto'
}

export default Viewport1
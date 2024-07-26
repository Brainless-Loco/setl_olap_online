import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import FileListTab from "./Sections/FileListTab"
import DatasetTab from "./Sections/DatasetTab"
// import DatasetTab from "../../Tabs/DatasetTab"


const Viewport1 = ({}) => {

    

    return (
        <Box className='w-4/12 '>
            <Card>
                <CardHeader title='Structure Extraction' sx={{color:'#08094f',marginBottom:'0px',paddingBottom:'3px',paddingTop:'0px'}}/>
                <CardContent sx={{paddingY:0}} style={flexSetting}>
                    <Box sx={{height: 'auto', paddingY:0, marginY:0, overflowY: 'auto',width:'100%'}}>
                        <FileListTab/>
                    </Box>
                    <DatasetTab/>
                    
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
    overflowY:'auto',
}

export default Viewport1
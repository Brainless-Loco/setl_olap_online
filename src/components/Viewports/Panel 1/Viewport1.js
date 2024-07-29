import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import FileListTab from "./Sections/FileListTab"
import DatasetTab from "./Sections/DatasetTab"


const Viewport1 = ({}) => {

    

    return (
        <Card className='w-4/12 flex-1'>
            <CardHeader className="py-3" title='Structure Extraction' sx={{color:'#08094f'}}/>
            <CardContent sx={{paddingY:0}} className="py-0 flex flex-wrap flex-row w-full overflow-y-auto">
                <Box sx={{height: 'auto', paddingY:0, marginY:0, overflowY: 'auto',width:'100%'}}>
                    <FileListTab/>
                </Box>
                <Box className="py-0 my-0 overflow-y-auto w-full" sx={{height:'60vh'}}>
                    <DatasetTab/>
                </Box>
                
            </CardContent>
        </Card>
        
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
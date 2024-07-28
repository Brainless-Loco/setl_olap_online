import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import AttributeListTab from "./Sections/AttributeListTab"


const Viewport2 = ({}) => {

    

    return (
        <Box className='w-4/12 '>
            <Card>
                <CardHeader title='Instance Filtering' sx={{color:'#08094f',marginBottom:'0px',paddingBottom:'3px',paddingTop:'0px'}}/>
                <CardContent sx={{paddingY:0}} style={flexSetting}>
                    <AttributeListTab/>
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

export default Viewport2
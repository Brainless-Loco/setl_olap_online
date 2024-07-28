import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import AttributeListTab from "./Sections/AttributeListTab"


const Viewport2 = ({}) => {

    

    return (
        <Card className='w-4/12 flex-1'>
            <CardHeader title='Instance Filtering' className="py-3" sx={{color:'#08094f'}}/>
            <CardContent sx={{paddingY:0}} style={flexSetting}>
                <AttributeListTab/>
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

export default Viewport2
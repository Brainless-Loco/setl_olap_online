import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

export default function Viewport3() {
  return (
    <Card className='w-4/12 flex-1'>
        <CardHeader className="py-3" title='Selection Summary' sx={{color:'#08094f'}}/>
        <CardContent sx={{paddingY:0}} style={flexSetting}>
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

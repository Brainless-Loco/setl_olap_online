import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

export default function Viewport3() {
  return (
    <Card className='w-4/12 flex-1'>
        <CardHeader className="py-3" title='Selection Summary' sx={{color:'#08094f'}}/>
        <CardContent sx={{maxHeight:'100vh'}} className={"flex justify-center flex-wrap flex-row w-full overflow-y-auto py-0"}>
          
        </CardContent>
    </Card>
  )
}


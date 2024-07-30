import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography  from "@mui/material/Typography"
import AMeasure from "@/components/SelectedComponents/AMeasure"
import ALevel from "@/components/SelectedComponents/ALevel"

export default function Viewport3() {
  return (
    <Card className='w-4/12 flex-1'>
        <CardHeader className="py-3" title='Selection Summary' sx={{color:'#08094f'}}/>
        <CardContent sx={{maxHeight:'110vh'}} className={"flex justify-center flex-wrap flex-row gap-2 w-full overflow-y-auto py-0"}>
          <Card className="w-full border-2 rounded p-2">
            <Typography className="p-0 pb-1 text-xl font-medium font-sans" sx={{color:'#08094f'}}>Measures</Typography>
            <CardContent className="w-full p-0 overflow-auto"  sx={{height:"35vh"}}>
              <AMeasure/>
              <AMeasure/>
            </CardContent>
          </Card>
          <Card className="w-full border-2 rounded p-2">
            <Typography className="p-0 pb-1 text-xl font-medium font-sans" sx={{color:'#08094f'}}>Levels</Typography>
            <CardContent className="w-full p-0 overflow-auto"  sx={{height:"60vh"}}>
              <ALevel/>
              <ALevel/>
            </CardContent>
          </Card>
        </CardContent>
    </Card>
  )
}


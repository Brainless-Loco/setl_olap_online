import CardContent from "@mui/material/CardContent"
import Card from '@mui/material/Card'
import Typography  from "@mui/material/Typography"
import { useSelector } from "react-redux";
import ALevel from "@/components/SelectedComponents/ALevel";

export default function SelectedLevels() {

  const selected_levels = useSelector((state) => state.queryReducer.selectedLevels);

    return (
      <Card className="w-full border-2 rounded p-2">
          <Typography className="p-0 pb-1 text-xl font-medium font-sans" sx={{color:'#08094f'}}>Levels</Typography>
          <CardContent className="w-full p-0 overflow-auto"  sx={{height:"60vh"}}>
            {
              selected_levels.map((level, index) => (
                <ALevel key={index} info={level} />
              ))
            }
          </CardContent>
      </Card>
    )
}

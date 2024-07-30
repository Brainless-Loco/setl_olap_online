import Card from '@mui/material/Card'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch, useSelector } from "react-redux";

export default function AMeasure({info}) {

    return (
        <Card className="w-full border-2 rounded p-2 overflow-y-auto mt-2">
            <Box className="w-full flex justify-center">
                
                <Box className="w-11/12 flex items-center">
                    <Typography  className="p-0 ml-1 text-sm font-semibold" sx={{color:'#08094f'}}>mdAttribute:Something</Typography>
                </Box>
                
                <Box className="w-1/11 flex justify-start">      
                    <Button onClick={()=>{console.log("clicked")}} className="w-full h-10 rounded">
                        <DeleteIcon className="text-red-600"/>
                    </Button>
                </Box>
            </Box>
            <Box className="full mt-0 pt-0">
                <Typography className="pl-3 text-sm" >
                    <RadioButtonCheckedIcon className="mr-1 text-sm" />
                    qb4o:Sum
                </Typography>
            </Box>
            
        </Card>
    )
}

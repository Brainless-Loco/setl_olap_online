import Card from '@mui/material/Card'
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function ALevel({info}) {
    
    const dispatch = useDispatch()

    const [selectedAttribute, setselectedAttribute] = useState('')

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
            <Box className="w-full" >
                {/* Attributes to be viewed */}
                <select onChange={(e)=>{console.log(e.target.value)}} className="w-full mb-2 border border-slate-500 rounded mt-2 text-sm p-1">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>

                <Box sx={{maxHeight:'25vh'}} className="w-full pb-3 overflow-auto">
                    {/* Filtering Values of the corresponding Attribute */}
                    <Typography className="pl-3 pt-1 text-sm">
                        <RadioButtonCheckedIcon className="mr-1 text-sm"/>
                        qb4o:Sum
                    </Typography>
                    <Typography className="pl-3 pt-1 text-sm" >
                        <RadioButtonCheckedIcon className="mr-1 text-sm" />
                        qb4o:Sum
                    </Typography>
                </Box>

            </Box>
            
        </Card>
    )
}

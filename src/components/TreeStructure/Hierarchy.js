import Box from "@mui/material/Box"
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Level from "./Level";

export default function Hierarchy() {
    const [levelShow, setLevelShow] = useState(false)


    return (
        <Box sx={{borderColor:'gray'}}>
           <Box onClick={()=>setLevelShow(!levelShow)} sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',cursor:'pointer'}}>
                <Box className='w-11/12' sx={{position:'relative',borderColor:'gray',borderLeftWidth:'2px'}}>
                    <span style={leftLine}></span>
                    <span style={leftCircle}></span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Hierarchy Title
                </Box>
                <Box  className='w-1/12 text-center'>
                   <KeyboardArrowDownIcon/>
                </Box>
            </Box>
            <Box sx={{borderColor:'gray',borderLeftWidth:'2px',paddingLeft:'15px'}} hidden={!levelShow}>
                <Level/>
                <Level/>
            </Box>
        </Box>
    )
}

const leftLine = {
    position:'absolute',
    backgroundColor:'gray',
    height:'2px',
    width:'5%',
    top:'40%',
    left:'0%'
}

const leftCircle = {
    position:'absolute',
    backgroundColor:'gray',
    height:'7px',
    width:'7px',
    borderRadius:'50%',
    top:'30%',
    left:'-17.5%'
}
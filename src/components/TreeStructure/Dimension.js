import Box from "@mui/material/Box"
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Hierarchy from "./Hierarchy";

export default function Dimension() {

    const [hierarchyShow, setHierarchyShow] = useState(false)

    return (
        <Box sx={{paddingLeft:'10px'}}>
            <Box onClick={()=>setHierarchyShow(!hierarchyShow)} sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',cursor:'pointer'}}>
                <Box className='w-11/12'>
                    Dimension Title
                </Box>
                <Box  className='w-1/12 text-center'>
                   <KeyboardArrowDownIcon/>
                </Box>
            </Box>
            <Box sx={{borderColor:'gray',borderLeftWidth:'2px',paddingLeft:'15px'}} hidden={!hierarchyShow}>
                <Hierarchy/>
                <Hierarchy/>
            </Box>
        </Box>
        
    )
}

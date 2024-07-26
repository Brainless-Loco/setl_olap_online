import Box from "@mui/material/Box"

export default function Level() {


    return (
        <Box>
            <Box sx={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',cursor:'pointer'}}>
                <Box  className='w-full'  sx={{position:'relative',borderColor:'gray',borderLeftWidth:'2px'}}>
                    <span style={leftLine}></span>
                    <span style={leftCircle}></span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    Level Title
                </Box>
            </Box>
        </Box>
    )
}

const leftLine = {
    position:'absolute',
    backgroundColor:'gray',
    height:'2px',
    width:'5%',
    top:'45%',
    left:'0%'
}

const leftCircle = {
    position:'absolute',
    backgroundColor:'gray',
    height:'7px',
    width:'7px',
    borderRadius:'50%',
    top:'28%',
    left:'-24%'
}
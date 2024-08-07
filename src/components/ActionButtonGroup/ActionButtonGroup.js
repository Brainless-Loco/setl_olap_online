import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import CodeIcon from '@mui/icons-material/Code';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeModal from '../GeneratedSparqlCode/CodeModal';

export default function ActionButtonGroup() {

    const selectedMeasuresLength = useSelector((state)=>state.queryReducer.selectedMeasures.length)
    const  selectedLevels = useSelector((state)=>state.queryReducer.selectedLevels)



    return (
        <Box className='w-full min-h-20 flex justify-center items-center'>
            <Button 
                disabled={selectedMeasuresLength==0 || selectedLevels != {}} 
                startIcon={<CodeIcon/>} 
                className='h-full py-4 px-6 font-bold mx-8 text-cyan-950 border-4 border-cyan-950 transition duration-400' 
                sx={{':hover':{borderWidth:'4px', borderColor:'transparent',backgroundColor:'#d3dde8'}}} 
                variant="outlined">
                Generate Query
            </Button>
            <Button 
                disabled={selectedMeasuresLength==0 || selectedLevels != {}} 
                startIcon={<PlayArrowIcon/>} 
                className='h-full py-4 px-6 font-bold mx-8 text-cyan-950 border-4 border-cyan-950 transition duration-400' 
                sx={{':hover':{borderWidth:'4px', borderColor:'transparent',backgroundColor:'#d3dde8'}}} 
                variant="outlined">
                Execute Query
            </Button>
            {
                selectedLevels != {} && selectedMeasuresLength>0 && <CodeModal/>
            }
        </Box>
    )
}

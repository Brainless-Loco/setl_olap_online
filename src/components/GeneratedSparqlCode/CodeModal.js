import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GenerateQuery from "@/lib/custom/GenerateQuery";

import { useSelector } from "react-redux"

export default function CodeModal() {
    const everyThingForQuery = useSelector(state=>state.queryReducer)

    
    
    const [codeModalOpen, setCodeModalOpen] = useState(true);
    

    useEffect(() => {
        
        if(everyThingForQuery.selectedLevels !== {} >0 &&
            everyThingForQuery.selectedMeasures.length>0)
        {
            // console.log(GenerateQuery(everyThingForQuery))
            GenerateQuery(everyThingForQuery)
        }
    }, [everyThingForQuery])
    
    
    return (
        <Dialog
            open={codeModalOpen}
            onClose={()=>{setCodeModalOpen(!codeModalOpen);}}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={()=>{setCodeModalOpen(!codeModalOpen);}}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
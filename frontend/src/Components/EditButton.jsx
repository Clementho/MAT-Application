import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const EditButton = ({setOpen}) => {

    const handleClick = () => {
        setOpen(true)
    }

    return(
        <IconButton 
            onClick={handleClick}
            sx={{
                position: "absolute",
                right: 40,
                bgcolor: "#38A6DE",
                color: "#FFFFFF",
                borderRadius: "15px",
                columnGap: "5px",
                padding: "10px 15px",
                "&:hover": {
                    bgcolor: "#1C4D91",
                }
            }}
        >
            <EditIcon />
            <Typography fontWeight="bold">Edit</Typography>
        </IconButton>
    );
}

export default EditButton;
import React from 'react';
import { Box} from '@mui/material';
import { Field } from "formik";

const HorizontalAngle = (name) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '10px' }}>
        <Box>{name.type}:</Box>
        <Box component="div" sx={{ display: 'inline', marginRight: '10px' }}>
            <Field type="number" name={name.name1} min="0" style={{width:"60%"}}/> {'\u00b0'}
        </Box>
        <Box component="div" sx={{ display: 'inline', marginRight: '10px' }}>
            <Field type="number" name={name.name2} min="0" max ="90" style={{width:"60%"}}/> {'\u00b0'}
        </Box>
    </Box>
  )
}

export default HorizontalAngle
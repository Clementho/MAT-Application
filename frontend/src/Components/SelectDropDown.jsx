import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option, optionName, theme) {
  return {
    fontWeight:
    optionName.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectDropDown({ options, placeholder, field, setFieldTouched }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const { value } = event.target;
    field.onChange({
      target: {
        name: field.name,
        value: value,
      },
    });
  };

  const handleBlur = () => {
    setFieldTouched(field.name, true, true);
  }

  return (
    <FormControl sx={{ width: "62.3%" }}>
      <Select
        name={field.name}
        value={field.value}
        onChange={handleChange}
        onBlur={handleBlur}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span>{placeholder}</span>;
          }else{
            return selected;
          }
        }}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        sx={{
            bgcolor: "#F0EFEF",
            borderRadius: "10px",
            fontSize: "1.2rem",
        }}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, field.value, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

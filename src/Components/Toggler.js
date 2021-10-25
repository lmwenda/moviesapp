import React from 'react'
import Switch from '@mui/material/Switch';
import { func, string } from 'prop-types';

const Toggle = ({toggleTheme }) => {
    return (
        <Switch name="Theme" onClick={toggleTheme} />
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;
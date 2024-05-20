import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Props {
    isLogin: boolean,
    setIsLogin: (value: boolean) => void;
}

export const AuthorizationTypeResolver = (props: Props) => {
    return (<ToggleButtonGroup className='w-100 mb-3'>
        <ToggleButton
            fullWidth
            color="primary"
            value={props.isLogin}
            selected={props.isLogin}
            onClick={() => props.setIsLogin(true)}
        >
            {'Login'}
        </ToggleButton>
        <ToggleButton
            fullWidth
            color="primary"
            value={props.isLogin}
            selected={!props.isLogin}
            onClick={() => props.setIsLogin(false)}
        >
            {'Register'}
        </ToggleButton>
    </ToggleButtonGroup>);
}
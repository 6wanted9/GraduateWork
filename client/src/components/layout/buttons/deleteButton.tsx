import React, { Dispatch } from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EntityViewModel } from "../../../dataModels/entityViewModel";
import { toast } from "react-toastify";
import Api from "../../../utils/Api";

interface Props<T extends EntityViewModel> {
    entityId: string,
    endpoint: (id: string) => string,
    stateSetter: Dispatch<React.SetStateAction<T[]>>
}

export const DeleteButton = <T extends EntityViewModel>(props: Props<T>) => {
    const deleteEntity = async () => {
        try {
            const entityId = props.entityId;
            await Api.delete(props.endpoint(entityId));
            props.stateSetter((prevState) => prevState.filter(value => value.id !== entityId))
        } catch (e) {
            toast.error('Something went wrong');
        }
    }

    return (<IconButton size='small' onClick={deleteEntity}>
        <Delete />
    </IconButton>)
}
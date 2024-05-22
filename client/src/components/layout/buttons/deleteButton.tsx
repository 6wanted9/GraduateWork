import React, { Dispatch, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EntityViewModel } from "../../../dataModels/entityViewModel";
import { toast } from "react-toastify";
import Api from "../../../utils/Api";
import { AreYouSurePopUp } from "../areYouSurePopUp";

interface Props<T extends EntityViewModel> {
    entityId: string,
    endpoint: (id: string) => string,
    stateSetter: Dispatch<React.SetStateAction<T[]>>
}

export const DeleteButton = <T extends EntityViewModel>(props: Props<T>) => {
    const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);

    const buttonReference = useRef<HTMLButtonElement>(null);

    const deleteEntity = async () => {
        try {
            const entityId = props.entityId;
            await Api.delete(props.endpoint(entityId));
            props.stateSetter((prevState) => prevState.filter(value => value.id !== entityId))
        } catch (e) {
            toast.error('Something went wrong');
        }
    }

    return (<>
        <IconButton size='small' onClick={() => setIsConfirmationOpened(true)} ref={buttonReference}>
            <Delete />
        </IconButton>
        <AreYouSurePopUp action={deleteEntity} isOpened={isConfirmationOpened} setIsOpened={setIsConfirmationOpened} anchor={buttonReference.current} />
    </>);
}
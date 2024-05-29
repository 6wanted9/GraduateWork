import React, { Dispatch, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EntityViewModel } from "../../../dataModels/entityViewModel";
import { toast } from "react-toastify";
import Api from "../../../utils/Api";
import { AreYouSurePopUp } from "../areYouSurePopUp";
import { ErrorMessages } from "../../../constants/errorMessages";

interface Props<T extends EntityViewModel> {
  entityId: string;
  endpoint: (id: string) => string;
  entitiesListCallback: Dispatch<React.SetStateAction<T[]>>;
  customIcon?: React.ReactNode;
}

export const DeleteButton = <T extends EntityViewModel>(props: Props<T>) => {
  const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);

  const buttonReference = useRef<HTMLButtonElement>(null);

  const deleteEntity = async () => {
    try {
      const entityId = props.entityId;
      await Api.delete(props.endpoint(entityId));
      props.entitiesListCallback((prevState) =>
        prevState.filter((value) => value.id !== entityId),
      );

      toast.success("Operation was completed successfully.");
    } catch (e) {
      toast.error(ErrorMessages.DefaultError);
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setIsConfirmationOpened(true)}
        ref={buttonReference}
      >
        {props.customIcon ?? <Delete />}
      </IconButton>
      <AreYouSurePopUp
        action={deleteEntity}
        isOpened={isConfirmationOpened}
        setIsOpened={setIsConfirmationOpened}
        anchor={buttonReference.current}
      />
    </>
  );
};

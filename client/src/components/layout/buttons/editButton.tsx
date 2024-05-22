import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../../utils/routeUtils";

interface Props {
  entityId: string;
  editPagePath: string;
}
export const EditButton = (props: Props) => {
  const navigate = useNavigate();

  const redirectToEditPage = () => {
    const path = getRoute(props.editPagePath, props.entityId);
    return navigate(path);
  };

  return (
    <IconButton size="small" onClick={redirectToEditPage}>
      <Edit />
    </IconButton>
  );
};

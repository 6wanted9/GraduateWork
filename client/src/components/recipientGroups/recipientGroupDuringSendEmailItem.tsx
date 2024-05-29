import React, { Dispatch } from "react";
import { Box, Typography } from "@mui/material";
import { DeleteButton } from "../layout/buttons/deleteButton";
import { apiUrls } from "../../constants/api";
import { routePaths } from "../../constants/routePaths";
import { EditButton } from "../layout/buttons/editButton";
import ListItemButton from "@mui/material/ListItemButton";
import { RecipientGroupViewModel } from "../../dataModels/recipientGroups/recipientGroupViewModel";

interface Props {
  group: RecipientGroupViewModel;
  recipientGroupsListCallback?: Dispatch<
    React.SetStateAction<RecipientGroupViewModel[]>
  >;

  selectedGroup: RecipientGroupViewModel | undefined;
  selectGroupCallback: Dispatch<
    React.SetStateAction<RecipientGroupViewModel | undefined>
  >;
}
export const RecipientGroupDuringSendEmailItem = (props: Props) => {
  const recipientGroupsListCallback = props.recipientGroupsListCallback;

  return (
    <ListItemButton
      selected={props.selectedGroup === props.group}
      onClick={() => props.selectGroupCallback(props.group)}
      className="d-flex flex-row justify-content-between"
    >
      <Typography>{props.group.name}</Typography>
      {recipientGroupsListCallback && (
        <Box className="d-flex flex-row">
          <EditButton
            entityId={props.group.id}
            editPagePath={routePaths.recipientGroups.path}
          />
          <DeleteButton
            entityId={props.group.id}
            endpoint={apiUrls.recipientGroups.item}
            entitiesListCallback={recipientGroupsListCallback}
          />
        </Box>
      )}
    </ListItemButton>
  );
};

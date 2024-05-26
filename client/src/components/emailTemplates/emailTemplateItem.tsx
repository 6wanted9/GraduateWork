import React, { Dispatch } from "react";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { Box, Typography } from "@mui/material";
import { DeleteButton } from "../layout/buttons/deleteButton";
import { apiUrls } from "../../constants/api";
import { routePaths } from "../../constants/routePaths";
import { EditButton } from "../layout/buttons/editButton";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  template: EmailTemplateViewModel;
  emailTemplatesListCallback?: Dispatch<
    React.SetStateAction<EmailTemplateViewModel[]>
  >;

  selectedTemplate: EmailTemplateViewModel | undefined;
  selectTemplateCallback: Dispatch<
    React.SetStateAction<EmailTemplateViewModel | undefined>
  >;
}
export const EmailTemplateItem = (props: Props) => {
  const emailTemplatesListCallback = props.emailTemplatesListCallback;

  return (
    <ListItemButton
      selected={props.selectedTemplate === props.template}
      onClick={() => props.selectTemplateCallback(props.template)}
      className="d-flex flex-row justify-content-between"
    >
      <Typography>{props.template.subject}</Typography>
      {emailTemplatesListCallback && (
        <Box className="d-flex flex-row">
          <EditButton
            entityId={props.template.id}
            editPagePath={routePaths.emailTemplates.edit}
          />
          <DeleteButton
            entityId={props.template.id}
            endpoint={apiUrls.emailTemplates.item}
            entitiesListCallback={emailTemplatesListCallback}
          />
        </Box>
      )}
    </ListItemButton>
  );
};

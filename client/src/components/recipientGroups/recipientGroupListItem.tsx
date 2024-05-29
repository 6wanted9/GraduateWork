import React, { Dispatch } from "react";
import { RecipientGroupViewModel } from "../../dataModels/recipientGroups/recipientGroupViewModel";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { EditButton } from "../layout/buttons/editButton";
import { DeleteButton } from "../layout/buttons/deleteButton";
import { apiUrls } from "../../constants/api";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RecipientsView } from "./recipients/recipientsView";
import { EditRecipientsFormControl } from "./recipients/editRecipientsFormControl";
import { Field, Formik, FormikHelpers } from "formik";
import { CreateRecipientGroupRequest } from "../../dataModels/recipientGroups/createRecipientGroupRequest";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import Api from "../../utils/Api";
import { toast } from "react-toastify";
import { ErrorMessages } from "../../constants/errorMessages";
import { EntityViewModel } from "../../dataModels/entityViewModel";
import { Check, Close } from "@mui/icons-material";

interface Props {
  group: RecipientGroupViewModel | undefined;
  stateSetter: Dispatch<React.SetStateAction<RecipientGroupViewModel[]>>;
  additionalAction?: () => void;
}

const ValidationSchema = Yup.object<CreateRecipientGroupRequest>().shape({
  name: Yup.string().required("Name is required."),
  recipients: Yup.array()
    .required("Recipients are required.")
    .min(1, "Recipients are required.")
    .of(Yup.string().required("Email cannot be empty.").email("Wrong Email.")),
});

const getValueSetter = (
  helpers: FormikHelpers<CreateRecipientGroupRequest>,
) => {
  return async (field: string, value: any) => {
    await helpers.setFieldValue(field, value, true);
  };
};

export const RecipientGroupListItem = (props: Props) => {
  const group = props.group;
  const isNewGroup = !group;
  const [open, setOpen] = React.useState(isNewGroup);
  const [isEditMode, setIsEditMode] = React.useState(isNewGroup);

  const initialValues: CreateRecipientGroupRequest = {
    name: group?.name ?? "",
    recipients: group?.recipients ?? [],
  };

  const onSubmit = async (
    request: CreateRecipientGroupRequest,
    helpers: FormikHelpers<CreateRecipientGroupRequest>,
  ) => {
    helpers.setSubmitting(true);
    const validationResult = await helpers.validateForm();
    const recipientsError = validationResult.recipients;
    if (validationResult.name || recipientsError) {
      if (recipientsError) {
        toast.error(recipientsError);
      }
      return helpers.setSubmitting(false);
    }

    try {
      const endpoint = apiUrls.recipientGroups.list;
      const isUpdate = !!group?.id;
      if (isUpdate) {
        await Api.patch(endpoint, { id: group!.id, ...request });
        group.name = request.name;
        group.recipients = request.recipients;
      } else {
        const entity: EntityViewModel = await Api.post(endpoint, request);

        const newGroup: RecipientGroupViewModel = {
          id: entity.id,
          name: request.name,
          recipients: request.recipients,
        };

        props.stateSetter((prevState) => prevState.concat(newGroup));
      }

      props.additionalAction?.();
      setIsEditMode(false);
      toast.success("Recipient Group was added successfully!");
    } catch (e) {
      toast.error(ErrorMessages.DefaultError);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={() => {}}
    >
      {(helpers) => (
        <>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell className="d-flex flex-row align-items-center">
              <IconButton
                size="large"
                className="m-3"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {isEditMode ? (
                <Field
                  type="text"
                  name="name"
                  label="name"
                  component={TextField}
                />
              ) : (
                <Typography>{group!.name}</Typography>
              )}
            </TableCell>
            <TableCell component="th" scope="row">
              {isEditMode ? (
                <>
                  <IconButton
                    size="small"
                    onClick={() => onSubmit(helpers.values, helpers)}
                    disabled={helpers.isSubmitting}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={helpers.isSubmitting}
                    onClick={() => {
                      props.additionalAction?.();
                      setIsEditMode(false);
                      helpers.resetForm();
                    }}
                  >
                    <Close />
                  </IconButton>
                </>
              ) : (
                <>
                  <EditButton
                    customAction={() => {
                      setIsEditMode(true);
                      setOpen(true);
                    }}
                  />
                  <DeleteButton
                    entityId={group!.id}
                    endpoint={apiUrls.recipientGroups.item}
                    entitiesListCallback={props.stateSetter}
                  />
                </>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  {isEditMode ? (
                    <EditRecipientsFormControl
                      recipients={helpers.values.recipients}
                      setValue={getValueSetter(helpers)}
                    />
                  ) : (
                    <RecipientsView recipients={group!.recipients} />
                  )}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      )}
    </Formik>
  );
};

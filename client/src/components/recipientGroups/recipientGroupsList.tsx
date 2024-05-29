import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { RecipientGroupViewModel } from "../../dataModels/recipientGroups/recipientGroupViewModel";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { toast } from "react-toastify";
import { ErrorMessages } from "../../constants/errorMessages";
import { RecipientGroupListItem } from "./recipientGroupListItem";

export const RecipientGroupsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddNewGroupEnabled, setIsAddNewGroupEnabled] = useState(false);

  const [recipientGroups, setRecipientGroups] = useState<
    Array<RecipientGroupViewModel>
  >([]);

  const getRecipientGroups = async () => {
    try {
      const templates: Array<RecipientGroupViewModel> = await Api.get(
        apiUrls.recipientGroups.list,
      );

      setRecipientGroups(templates);
    } catch (e) {
      toast.error(ErrorMessages.DefaultError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipientGroups();
  }, []);

  return isLoading ? (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <CircularProgress />
    </div>
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton
                size="small"
                disabled={isAddNewGroupEnabled}
                onClick={() => setIsAddNewGroupEnabled(true)}
              >
                <Add />
              </IconButton>
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipientGroups.map((group, index) => (
            <RecipientGroupListItem
              key={index}
              group={group}
              stateSetter={setRecipientGroups}
            />
          ))}
          {isAddNewGroupEnabled && (
            <RecipientGroupListItem
              key={recipientGroups.length}
              group={undefined}
              stateSetter={setRecipientGroups}
              additionalAction={() => setIsAddNewGroupEnabled(false)}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

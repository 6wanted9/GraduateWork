import React from "react";
import { useEffect, useState } from "react";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
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
import { toast } from "react-toastify";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { EmailTemplateItem } from "./emailTemplateItem";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../constants/routePaths";

export const EmailTemplatesList = () => {
  const navigate = useNavigate();
  const [emailTemplates, setEmailTemplates] = useState<
    Array<EmailTemplateViewModel>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEmailTemplates = async () => {
    const templates: Array<EmailTemplateViewModel> = await Api.get(
      apiUrls.emailTemplates.list,
    );
    setEmailTemplates(templates);
    setIsLoading(false);
  };

  const useRedirect = () => {
    return navigate(routePaths.emailTemplates.add);
  };

  useEffect(() => {
    try {
      getEmailTemplates();
    } catch (e) {
      toast.error("Some error");
    }
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
              <IconButton size="small" onClick={useRedirect}>
                <Add />
              </IconButton>
            </TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emailTemplates.map((mailingAccount, index) => (
            <EmailTemplateItem
              key={index}
              template={mailingAccount}
              stateSetter={setEmailTemplates}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

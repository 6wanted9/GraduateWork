import React from "react";
import { useEffect, useState } from "react";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { toast } from "react-toastify";
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { EmailTemplateItem } from "./emailTemplateItem";

export const EmailTemplatesList = () => {
    const [emailTemplates, setEmailTemplates] = useState<Array<EmailTemplateViewModel>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getEmailTemplates = async () => {
        const templates: Array<EmailTemplateViewModel> = await Api.get(apiUrls.emailTemplates.list);
        setEmailTemplates(templates);
        setIsLoading(false);
    }

    useEffect(() => {
        try {
            getEmailTemplates();
        } catch (e) {
            toast.error("Some error");
        }
    }, []);

    return (isLoading
        ? <div className='d-flex flex-column justify-content-center align-items-center'><CircularProgress /></div>
        : <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Subject</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {emailTemplates.map((mailingAccount, index) =>
                        <EmailTemplateItem key={index} template={mailingAccount} stateSetter={setEmailTemplates} />)}
                </TableBody>
            </Table>
        </TableContainer>);
}
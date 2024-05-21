import React from "react";
import { useEffect, useState } from "react";
import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import { MailingAccountItem } from "./mailingAccountItem";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export const MailingAccountsList = () => {
    const [mailingAccounts, setMailingAccounts] = useState<Array<MailingAccountViewModel>>();

    const getMailingAccounts = async () => {
        const accounts: Array<MailingAccountViewModel> = await Api.get(apiUrls.mailingAccounts.list);
        setMailingAccounts(accounts);
    }

    useEffect(() => {
        try {
            getMailingAccounts();
        } catch (e) {
            toast.error("Some error");
        }
    }, []);

    return (<div className='d-flex '>
        {mailingAccounts?.map((mailingAccount, index) => <MailingAccountItem key={index} account={mailingAccount} />) ?? <CircularProgress />}
    </div>);
}
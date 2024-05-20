import React from "react";
import { useEffect, useState } from "react";
import { MailingAccount } from "../../dataModels/mailingAccount";
import { MailingAccountItem } from "./mailingAccountItem";
import { apiUrls } from "../../constants/api";
import Api from "../../utils/Api";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export const MailingAccountsList = () => {
    const [mailingAccounts, setMailingAccounts] = useState<Array<MailingAccount>>();

    const getMailingAccounts = async () => {
        const accounts: Array<MailingAccount> = await Api.get(apiUrls.mailingAccounts.list);
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
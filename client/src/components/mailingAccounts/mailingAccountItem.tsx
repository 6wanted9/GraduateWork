import { MailingAccountViewModel } from "../../dataModels/mailingAccounts/mailingAccountViewModel";
import { Image } from "react-bootstrap";
import React from "react";

interface Props {
    account: MailingAccountViewModel
}
export const MailingAccountItem = (props: Props) => {
    return (<div className="d-flex flex-column align-items-center m-2">
        <Image className="mb-2" src={props.account.picture} referrerPolicy="no-referrer" roundedCircle />
        <div className="d-flex flex-column align-items-start">
            <span><b>Name:</b> {props.account.name}</span>
            <span><b>Email:</b> {props.account.email}</span>
        </div>
    </div>);
}
import { MailingAccount } from "../../dataModels/mailingAccount";
import { Image } from "react-bootstrap";
import React from "react";

interface Props {
    account: MailingAccount
}
export const MailingAccountItem = (props: Props) => {
    return (<div className="d-flex flex-column align-items-center m-2">
        <Image className="mb-2" src={props.account.picture} roundedCircle />
        <div className="d-flex flex-column align-items-start">
            <span><b>Name:</b> {props.account.name}</span>
            <span><b>Email:</b> {props.account.email}</span>
        </div>
    </div>);
}
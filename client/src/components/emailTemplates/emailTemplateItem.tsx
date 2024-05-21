import React, { Dispatch } from "react";
import parse from 'html-react-parser'
import { EmailTemplateViewModel } from "../../dataModels/emailTemplates/emailTemplateViewModel";
import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DeleteButton } from "../layout/buttons/deleteButton";
import { apiUrls } from "../../constants/api";

interface Props {
    template: EmailTemplateViewModel,
    stateSetter: Dispatch<React.SetStateAction<EmailTemplateViewModel[]>>
}
export const EmailTemplateItem = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    return (<React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell className="d-flex flex-row align-items-center">
                <IconButton
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {props.template.subject}
            </TableCell>
            <TableCell component="th" scope="row">
                <DeleteButton entityId={props.template.id} endpoint={apiUrls.emailTemplates.item} stateSetter={props.stateSetter} />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <div>{parse(props.template.content)}</div>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>);
}
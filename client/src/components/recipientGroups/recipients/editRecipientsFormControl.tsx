import { Chip } from "@mui/material";
import React, { KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface Props {
  recipients: Array<string>;
  setValue: (field: string, value: any) => Promise<void>;
}

export const EditRecipientsFormControl = (props: Props) => {
  const [newTag, setNewTag] = useState("");
  const [isError, setIsError] = useState(false);

  const setRecipients = (recipients: Array<string>) => {
    props.setValue("recipients", recipients);
  };

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    if (!(await Yup.string().email().isValid(newTag))) {
      setIsError(true);
      return;
    }
    setRecipients(props.recipients.concat(newTag));
    setNewTag("");
  };

  const deleteRecipient = (recipient: string) => {
    setRecipients(props.recipients.filter((r) => r !== recipient));
  };

  return (
    <div className="d-flex flex-row align-items-center">
      {props.recipients.map((recipient, index) => (
        <Chip
          className="m-1"
          key={index}
          label={recipient}
          onDelete={() => deleteRecipient(recipient)}
        />
      ))}
      <TextField
        error={isError}
        helperText={isError && "Wrong email."}
        variant="standard"
        value={newTag}
        onKeyUp={handleKeyPress}
        onChange={(e) => {
          setNewTag(e.target.value);
          setIsError(false);
        }}
        placeholder="Start typing.."
      />
    </div>
  );
};

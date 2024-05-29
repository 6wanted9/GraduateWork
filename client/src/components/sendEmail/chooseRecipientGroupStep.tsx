import { SendEmailProps } from "../../constants/sendEmail/sendEmailProps";
import React, { useEffect, useState } from "react";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import List from "@mui/material/List";
import { RecipientGroupViewModel } from "../../dataModels/recipientGroups/recipientGroupViewModel";
import { RecipientGroupDuringSendEmailItem } from "../recipientGroups/recipientGroupDuringSendEmailItem";
import { ErrorMessages } from "../../constants/errorMessages";

export const ChooseRecipientGroupStep = (props: SendEmailProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedGroup, setSelectedGroup] = useState<RecipientGroupViewModel>();

  const [recipientGroups, setRecipientGroups] = useState<
    Array<RecipientGroupViewModel>
  >([]);

  const getRecipientGroups = async () => {
    try {
      const groups: Array<RecipientGroupViewModel> = await Api.get(
        apiUrls.recipientGroups.list,
      );

      setRecipientGroups(groups);
    } catch (e) {
      toast.error(ErrorMessages.DefaultError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipientGroups();
  }, []);

  useEffect(() => {
    props.setValue("recipientGroup", selectedGroup);
  }, [selectedGroup]);

  return isLoading ? (
    <div className="d-flex flex-column justify-content-center align-items-center rounded-4">
      <CircularProgress />
    </div>
  ) : (
    <List
      component="nav"
      className="h-100 w-100 overflow-auto me-3 rounded-4"
      sx={{ backgroundColor: "whitesmoke" }}
    >
      {recipientGroups.map((recipientGroup, index) => (
        <RecipientGroupDuringSendEmailItem
          key={index}
          group={recipientGroup}
          selectedGroup={selectedGroup}
          selectGroupCallback={setSelectedGroup}
        />
      ))}
    </List>
  );
};

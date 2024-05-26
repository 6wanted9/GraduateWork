const apiBaseUrl = process.env.REACT_APP_API_URL || "";

const apiUrls = {
  authorization: {
    login: "/api/Auth/login",
    register: "/api/Auth/register",
  },
  mailingAccounts: {
    list: "/api/MailingAccounts",
    item: (id: string) => `/api/MailingAccounts/${id}`,
  },
  emailTemplates: {
    list: "/api/EmailTemplates",
    item: (id: string) => `/api/EmailTemplates/${id}`,
  },
  recipientGroups: {
    list: "/api/RecipientGroups",
    item: (id: string) => `/api/RecipientGroups/${id}`,
  },
  emailManagement: {
    send: "api/EmailManagement/send",
  },
};

export { apiUrls, apiBaseUrl };

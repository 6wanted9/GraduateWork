export const routePaths = {
  home: "/",
  authorization: "/authorization",
  notFound: "/not-found",
  emailTemplates: {
    path: "/email-templates",
    add: "/email-templates/add",
    edit: `/email-templates/edit/:emailTemplateId`,
  },
  recipientGroups: {
    path: "/recipients-groups",
    edit: `/recipients-groups/edit/:recipientGroupId`,
  },
  mailingAccounts: {
    path: "/mailing-accounts",
  },
  sendEmail: "/send-email",
};

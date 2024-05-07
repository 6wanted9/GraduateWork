const apiBaseUrl = process.env.REACT_APP_API_URL || '';

const apiUrls = {
    mailingAccounts: {
        create: "/api/MailingAccounts"
    }
}

export { apiUrls, apiBaseUrl };
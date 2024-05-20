const apiBaseUrl = process.env.REACT_APP_API_URL || '';

const apiUrls = {
    authorization: {
        login: '/api/Auth/login',
        register: '/api/Auth/register'
    },
    mailingAccounts: {
        list: "/api/MailingAccounts"
    }
}

export { apiUrls, apiBaseUrl };
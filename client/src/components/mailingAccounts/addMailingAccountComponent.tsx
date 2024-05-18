import React, { useEffect, useState } from "react";
import { CodeResponse, googleLogout, useGoogleLogin } from "@react-oauth/google";
import Api from "../../utils/Api";
import { apiUrls } from "../../constants/api";

export const AddMailingAccountComponent = () => {
    const [ tokenResponse, setTokenResponse ] = useState<CodeResponse>();
    const [ profile, setProfile ] = useState<any>(null);

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            setTokenResponse(codeResponse)
        },
        onError: () => console.log('Login Failed:'),
        flow: 'auth-code',
        scope: 'https://www.googleapis.com/auth/gmail.send',
        overrideScope: true,
    });

    const createMailingAccount = async (code: string) => {
        const response = await Api.post(apiUrls.mailingAccounts.create, {
            "token": code
        });

        setProfile(response.data);
    }

    useEffect(() => {
        if (tokenResponse && tokenResponse.code) {
            createMailingAccount(tokenResponse.code).catch(console.error);
        }
    }, [tokenResponse]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br/>
            <br/>
            {profile ? (
                <div>
                    {/*<img src={profile.picture} alt="user image"/>*/}
                    <h3>User Logged in</h3>
                    {/*<p>Name: {profile.name}</p>*/}
                    {/*<p>Email Address: {profile.email}</p>*/}
                    <br/>
                    <br/>
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
};
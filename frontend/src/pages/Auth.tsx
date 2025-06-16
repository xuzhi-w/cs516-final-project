import React, { useEffect } from 'react'

function Auth() {

    // read id_token, access_token, expires_in, and token_type from the url

    useEffect(() => {
        const url = window.location.href;
        const params = new URLSearchParams(url.split('#')[1]);
        const idToken = params.get('id_token');
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');
        const tokenType = params.get('token_type');

        console.log({
            idToken,
            accessToken,
            expiresIn,
            tokenType
        });
    }, [])


    return (
        <div>Auth</div>
    )
}

export default Auth
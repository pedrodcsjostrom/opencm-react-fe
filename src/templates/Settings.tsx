import React from "react";
import styled from "styled-components";
import Button from "../components/design-system/Button";


const ContentArea = styled.div`
  padding: ${props => props.theme.spacing(3)};
`;

const Title = styled.h1`
    color: ${props => props.theme.textColors.primary};
    margin-bottom: ${props => props.theme.spacing(1)};
`;

const TestButton = styled(Button)`
  margin-top: 2rem;
`;

const Settings: React.FC = () => {

    const linkedinAuth = () => {
        try {
            const clientID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
            const redirectURI = encodeURIComponent(import.meta.env.VITE_LINKEDIN_REDIRECT_URI);
            const scope = encodeURIComponent('profile email w_member_social');

            const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
                `response_type=code&` +
                `client_id=${clientID}&` +
                `redirect_uri=${redirectURI}&` +
                `state=foobar&` +
                `scope=${scope}`;

            window.location.href = linkedinAuthUrl;
        } catch (error) {
            console.error('Error constructing LinkedIn auth URL:', error);
        }
    };

    return (
        <ContentArea>
            <Title>Settings</Title>
            <TestButton onClick={linkedinAuth}>Linkedin</TestButton>
        </ContentArea>
    );
};

export default Settings;
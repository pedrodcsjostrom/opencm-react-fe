import { useDispatch } from "react-redux";
import { getUser } from "../store/user/userSlice";
import { AppDispatch } from "../store/store";
import styled from "styled-components";
import Button from "../components/design-system/Button";

const ContentArea = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
    color: ${props => props.theme.textColors.primary};
    margin-bottom: 8px;
`;

const TestButton = styled(Button)`
  margin-top: 2rem;
`;

const MainDashboardPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleGetUser = () => {
        dispatch(getUser());
    };

    return (
        <ContentArea>
            <Title>PostQueue</Title>
            <TestButton onClick={handleGetUser}>Get User</TestButton>
        </ContentArea>
    );
};

export default MainDashboardPage;
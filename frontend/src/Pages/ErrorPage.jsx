import { Container, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";

const ErrorPageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const ErrorCode = styled(Typography)`
  font-size: 10rem;
  color: #ff6b6b;
`;

const ErrorMessage = styled(Typography)`
  font-size: 2rem;
  margin: 20px 0;
`;

const ErrorDescription = styled(Typography)`
  font-size: 1.2rem;
  margin: 20px 0;
  max-width: 600px;
`;

const HomeButton = styled(Button)`
  margin-top: 20px;
`;

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <ErrorCode variant="h1">404</ErrorCode>
      <ErrorMessage variant="h2">Page Not Found</ErrorMessage>
      <ErrorDescription variant="body1">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </ErrorDescription>
      <HomeButton
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/"
      >
        Go to Homepage
      </HomeButton>
    </ErrorPageContainer>
  );
};

export default ErrorPage;

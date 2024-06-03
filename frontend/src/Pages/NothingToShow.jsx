import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

const NothingToShowContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const IconWrapper = styled(Box)`
  margin-bottom: 20px;
`;

const Message = styled(Typography)`
  font-size: 1.5rem;
  margin: 20px 0;
`;

const HomeButton = styled(Button)`
  margin-top: 20px;
`;

const NothingToShow = ({ setQueryParams, queryParams }) => {
  const setQueryParamshandle = () =>
    setQueryParams({
      ...queryParams,
      page: 1,
      search: "",
      isSearch: true,
      isHomeNav: true,
    });
  return (
    <NothingToShowContainer>
      <IconWrapper>
        <SentimentDissatisfiedIcon
          style={{ fontSize: "5rem", color: "#ff6b6b" }}
        />
      </IconWrapper>
      <Message variant="h5">There is nothing to show here!</Message>
      <Typography variant="body1" color="textSecondary">
        It looks like there is no content available at the moment. Please check
        back later.
      </Typography>
      <HomeButton
        variant="contained"
        color="primary"
        component={RouterLink}
        onClick={setQueryParamshandle}
        to="/home"
      >
        Go to Homepage
      </HomeButton>
    </NothingToShowContainer>
  );
};

export default NothingToShow;
NothingToShow.propTypes = {
  setQueryParams: PropTypes.any,
  queryParams: PropTypes.any,
};

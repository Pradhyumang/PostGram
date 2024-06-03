import { useFetchPostQuery } from "../../Store/api/PostApi";
import PostComp from "./PostComp";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NothingToShow from "../NothingToShow";
const initialState = {
  page: 1,
  perPage: 5,
  search: "",
  isMyPostsOnly: false,
  isPrivate: false,
  isSearch: false,
  isHomeNav: false,
};
const Home = () => {
  const [queryParams, setQueryParams] = useState(initialState);
  const navigate = useNavigate();
  // const { search } = useParams();
  const { search: urlParam } = useLocation();
  const search = new URLSearchParams(urlParam).get("search");
  // console.log(search);
  const {
    // isError,
    isLoading,
    isSuccess,
    isFetching,
    data: postData,
  } = useFetchPostQuery(queryParams);
  // console.log(postData.data.data);
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setQueryParams({
          ...queryParams,
          page: queryParams.page + 1,
          isSearch: false,
          isHomeNav: false,
        });
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [queryParams, isFetching]);
  useEffect(() => {
    // console.log(search);
    if (search || search === "" || search === null) {
      setQueryParams({
        ...queryParams,
        page: 1,
        search: search?.trim() || "",
        isSearch: true,
        isHomeNav: true,
      });
    }
    // else {
    //   setQueryParams(initialState);
    // }
  }, [search]);
  // posts
  let posts;
  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
  if (isSuccess && postData) {
    if (postData?.data?.total === 0) {
      return (
        <center>
          {/* <div style={{ marginTop: "20px" }} /> */}
          <NothingToShow
            setQueryParams={setQueryParams}
            queryParams={queryParams}
          />
        </center>
      );
    }
    posts = postData?.data?.data.map((data, index) => {
      // console.log(data);
      return <PostComp key={index} data={data} />;
    });
  }

  return (
    <>
      <div style={{ position: "absolute" }}>
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: "35px",
            right: "35px",
          }}
          onClick={() => {
            navigate("/post");
          }}
        >
          <AddIcon />
        </Fab>
      </div>
      {posts}
    </>
  );
};

export default Home;

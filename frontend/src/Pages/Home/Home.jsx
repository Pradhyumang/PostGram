import { useFetchPostQuery } from "../../Store/api/PostApi";
import PostComp from "./PostComp";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
const initialState = {
  page: 1,
  perPage: 5,
  search: "",
  isMyPostsOnly: false,
  isPrivate: false,
  isSearch: false,
  isSearchEmpty: true,
};
const Home = () => {
  const [queryParams, setQueryParams] = useState(initialState);
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
          isSearchEmpty: false,
        });
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [queryParams, isFetching]);
  // posts
  let posts;
  if (isLoading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }
  if (isSuccess && postData) {
    posts = postData?.data?.data.map((data, index) => {
      // console.log(data);
      return <PostComp key={index} data={data} />;
    });
  }
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };
  const handleSearchChange = debounce((e) => {
    setQueryParams({
      ...queryParams,
      page: 1,
      search: e.target.value,
      isSearch: true,
      isSearchEmpty: false,
    });
  }, 750);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-end", mt: 1 }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Search"
          variant="standard"
          fullWidth
          onChange={handleSearchChange}
        />
      </Box>
      {posts}
    </>
  );
};

export default Home;

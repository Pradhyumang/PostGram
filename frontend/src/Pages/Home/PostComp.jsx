import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, MoreVert, Share } from "@mui/icons-material";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useFetchImageQuery } from "../../Store/api/PostApi";
const Nodata = {
  title: "No Title",
  description: "No Description",
  image: "No-image.jpg",
};
const PostComp = ({ data }) => {
  const { title, description, image } = data ? data : Nodata;
  const [imgSrc, setImgSrc] = useState(image);
  const [toogleHeart, setToogleHeart] = useState(false);
  const { data: Image, isSuccess } = useFetchImageQuery(data?._id);
  useEffect(() => {
    if (isSuccess) {
      setImgSrc(Image.imageData);
    }
  }, [Image, isSuccess]);

  const handleImageError = () => {
    setImgSrc("No-image.jpg");
  };
  return (
    <Card
      sx={{
        maxWidth: 650,
        margin: "auto",
        mt: 5,
        height: 450,
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0px 5px 35px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <CardHeader
        avatar={
          <LineWeightIcon
            sx={{ bgcolor: "" }}
            aria-label="recipe"
          ></LineWeightIcon>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={title || "No title"}
        // subheader="September 14, 2023"
      />
      <CardMedia
        component="img"
        image={imgSrc || "No-image.jpg"}
        sx={{ height: 250, objectFit: "fill", width: "100%" }}
        onError={handleImageError}
      />

      <CardContent sx={{ overflow: "auto", flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {description || "No Description"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() =>
            toogleHeart ? setToogleHeart(false) : setToogleHeart(true)
          }
        >
          <Favorite sx={{ color: toogleHeart ? "red" : "" }} />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default PostComp;

PostComp.propTypes = {
  data: PropTypes.any,
};

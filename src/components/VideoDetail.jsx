import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle, checkCircle } from "@mui/icons-material";
import { Video } from "./Videos";
import { fetchFormAPI } from "../utils/fetchFrom";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState([]);
  console.log(videoDetail);
  const { id } = useParams();
  useEffect(() => {
      fetchFormAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0]));
  }, [id]);
  if(!videoDetail?.snippet) return 'Loading...'

  const { snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount} } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "colums", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between"sx={{color: '#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm: 'subtitle', md: 'h6'}} color="#fff">
                  {channelTitle}
                  <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}}/>
                </Typography>
              </Link>
              <Stack></Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;

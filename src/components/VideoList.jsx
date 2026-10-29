import React, {useContext} from 'react';
import VideoItem from './VideoItem';
import styled from "styled-components";
import { Context } from "./ContextProvider";

const VideoList = ()=>{
    const { videos, selectedVideo, onVideoSelect, fetchMore, hasMore, isLoading } = useContext(Context);

    const handleScroll = (e) => {
        const box = e.currentTarget;
        const bottom = box.scrollHeight - box.clientHeight - box.scrollTop;
        if (bottom < 50 && hasMore && !isLoading) fetchMore();
    }

    const listOfVideos = videos.map(video => (
        <VideoItem
            key={video.id}
            video={video}
            onSelectVideo={onVideoSelect}
            isSelected={selectedVideo && selectedVideo.id === video.id}
        />
    ))
    return (
        <List onScroll={handleScroll}>
            <ul>
                {listOfVideos}
            </ul>
            {isLoading && hasMore && <Note>Loading more...</Note>}
        </List>
    );
}
export default VideoList;

const List = styled.div`
    background: oldlace;
    max-height: 100vh;
    height: 100%;
    width: 100%;
    border-radius: 0.4rem;
    overflow-y: auto;
    box-shadow: 0 0.2rem 0.8rem dimgrey;
    min-height: 320px;
`
const Note = styled.p`
    text-align: center;
    padding: 1rem;
`

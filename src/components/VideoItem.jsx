import React from 'react';
import styled from "styled-components";

const VideoItem = ({video, onSelectVideo, isSelected}) => {
    return(
        <List>
            <Item type='button' onClick={()=> onSelectVideo(video)} $isSelected={isSelected}>
                <Img alt='' loading='lazy' src={video.thumbnail}/>
                <ItemTitle>{video.title}</ItemTitle>
            </Item>
        </List>
    )
}
export default VideoItem;

const List = styled.li`
    display: grid;
    width:100%;
`
const Img = styled.img`
    margin-right: 2rem;
    width: 80%;
    @media (min-width: 1072px) {
        margin-right: 0;
        width:100%;
    }
`
const Item = styled.button`
    display: grid;
    grid-template-columns: 1fr 1fr;
    cursor: pointer;
    align-items: center;
    border: coral 1px dashed;
    justify-items: start;
    background-color: ${({ $isSelected }) => $isSelected ? '#ffd8a8' : '#a7cdf585'};
    padding: 2%;
    width: 100%;
    font: inherit;
    text-align: left;
    @media (min-width: 1072px) {
        grid-template-columns: 100%;
        justify-items: center;
    }

`
const ItemTitle = styled.div`
    text-align:center;
    font-size: 1.4rem;
    padding: 0.6rem;
    @media (min-width: 1072px) {
        font-size: 1.6rem;
    }
`

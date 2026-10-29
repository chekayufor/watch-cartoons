import React, {useContext} from 'react';
import styled from "styled-components";
import { Context } from "./ContextProvider";



const VideoDetail = ()=>{
    const { selectedVideo } = useContext(Context);

    const videoSrc = `https://www.youtube-nocookie.com/embed/${selectedVideo.id}?rel=0`
    return(
        <Container>
            <VideoContainer>
                <Iframe
                    title={selectedVideo.title}
                    src={videoSrc}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                />
            </VideoContainer>
            <ContentTitle>
                <h4>{selectedVideo.title} - {selectedVideo.channel}</h4>
                <h5>{selectedVideo.description}</h5>
            </ContentTitle>
        </Container>
    )
}
export default VideoDetail;

const Container = styled.div`
    display:grid;
    width:100%;
    background-color:#a7cdf585;
    grid-template-rows: auto auto;
    align-content: start;
`
const Iframe = styled.iframe`
    display: block;
    width:100%;
    aspect-ratio: 16 / 9;
`
const VideoContainer = styled.div`
    width: 100%;
    padding:2%;
`
const ContentTitle = styled.div`
    padding: 0 3% 3%;
    line-height: 1.5;
    font-family: cursive;
    font-size: 1.6rem;
    h4 {
        font-weight: bold;
        margin-bottom: 0.8rem;
    }
    @media (min-width: 1072px) {
        font-size: 2rem;
    }
`

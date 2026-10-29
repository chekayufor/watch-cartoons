import React, {useContext} from 'react';
import {SearchBar, VideoList, VideoDetail} from './components'
import GlobalStyles from './styles.lib/global.styles'
import styled from "styled-components";
import { Context } from "./components/ContextProvider";



const App = () => {
    const { selectedVideo, isLoading } = useContext(Context);

    return(
        <MainContainer>
            <SearchBar/>
            {selectedVideo ? (
                <ContentContainer>
                    <VideoDetail/>
                    <VideoList/>
                </ContentContainer>
            ) : (
                <Message>{isLoading ? 'Loading...' : 'No cartoons found. Try another search or pick a show above.'}</Message>
            )}
            <GlobalStyles />
        </MainContainer>
    )
}
export default App;

const MainContainer = styled.div`
    display: grid;
    width: 100%;
    min-height: 100%;
    grid-template-rows: auto 1fr;
    grid-gap: 1rem;
    padding: 2%;
    background-color: gray;
 `
const ContentContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 100%;
    grid-template-rows: auto 60vh;
    grid-gap: 1rem;
    @media (min-width: 1072px) {
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 80vh;
    }
 `
const Message = styled.p`
    color: white;
    font-size: 2rem;
    text-align: center;
    padding: 4rem 1rem;
 `

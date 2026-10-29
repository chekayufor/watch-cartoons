import React, { useState, useEffect } from "react";
import { API_KEY, searchVideos } from '../api/youtube';
import catalogue from '../data/videos';

const Context = React.createContext();
const { Provider } = Context;

const DEFAULT_SEARCH = 'Kid-E-Cats';

const searchCatalogue = (searchTerm) => {
    const words = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return catalogue;
    return catalogue.filter(video => {
        const text = `${video.show} ${video.title} ${video.channel}`.toLowerCase();
        return words.every(word => text.includes(word));
    });
};

const ContextProvider = ({ children }) => {

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [useLive, setUseLive] = useState(Boolean(API_KEY));

    useEffect(() => {
        handleSubmit(DEFAULT_SEARCH);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showResults = (results) => {
        setVideos(results);
        setSelectedVideo(results[0] || null);
    };

    const handleSubmit = async (term) => {
        setIsLoading(true);
        if (useLive) {
            try {
                const result = await searchVideos(term);
                showResults(result.videos);
                setNextPageToken(result.nextPageToken || null);
                setIsLoading(false);
                return;
            } catch (error) {
                // Bad key or quota used up: fall back to the built-in catalogue.
                console.warn('YouTube API unavailable, using built-in catalogue', error);
                setUseLive(false);
            }
        }
        showResults(searchCatalogue(term));
        setNextPageToken(null);
        setIsLoading(false);
    };

    const fetchMore = async () => {
        if (!useLive || !nextPageToken || isLoading) return;
        setIsLoading(true);
        try {
            const result = await searchVideos(searchTerm, nextPageToken);
            setVideos(prevState => {
                const ids = new Set(prevState.map(video => video.id));
                return [...prevState, ...result.videos.filter(video => !ids.has(video.id))];
            });
            setNextPageToken(result.nextPageToken || null);
        } catch (error) {
            setNextPageToken(null);
        }
        setIsLoading(false);
    };

    const onVideoSelect = (video) => {
        setSelectedVideo(video);
    };

  const state = {
      videos,
      selectedVideo,
      searchTerm,
      isLoading,
      hasMore: useLive && Boolean(nextPageToken),
  };
  // actions = callbacks to invoke
  const actions = {
      onVideoSelect,
      handleSubmit,
      setSearchTerm,
      fetchMore
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { ContextProvider, Context };

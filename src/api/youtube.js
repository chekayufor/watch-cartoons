import axios from 'axios';

// Optional: live YouTube search. Set REACT_APP_YOUTUBE_KEY (see .env.example).
// Without a key the site uses the built-in catalogue in src/data/videos.js.
export const API_KEY = process.env.REACT_APP_YOUTUBE_KEY;

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});

export const searchVideos = async (searchTerm, pageToken) => {
    const response = await youtube.get('search', {
        params: {
            part: 'snippet',
            maxResults: 24,
            key: API_KEY,
            q: searchTerm,
            type: 'video',
            videoEmbeddable: 'true',
            safeSearch: 'strict',
            pageToken,
        }
    });

    const videos = response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
    }));

    return { videos, nextPageToken: response.data.nextPageToken };
};

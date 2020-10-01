import React from 'react';
import StoryReel from '../StoryReel';
import MessageSender from '../MessageSender';
import './Feed.css';

function Feed() {
    return (
        <div className="feed">
          <StoryReel />
          <MessageSender />
          {/*
            postsData.map(entry => (
                <Post
                  profilePic={entry.avatar}
                  message={entry.text}
                  timestamp={entry.timestamp}
                  imgName={entry.imgName}
                  username={entry.user}
                />
            ))
            */}
        </div>
    );
};

export default Feed;

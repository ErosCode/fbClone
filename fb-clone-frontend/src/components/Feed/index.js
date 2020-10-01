import React from 'react';
import StoryReel from '../StoryReel';
import MessageSender from '../MessageSender';
import Post from '../Post';
import './Feed.css';

function Feed() {
    return (
        <div className="feed">
          <StoryReel />
          <MessageSender />
          <Post
            profilePic='https://images-eu.ssl-images-amazon.com/images/I/71frl22CXNL.png'
            message="yooooooo!!!!"
            timestamp='1601493943737'
            imgName='imgName'
            username='Ayayaya'
          />
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

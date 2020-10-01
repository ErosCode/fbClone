import React from 'react';

import './Feed.scss';

function Feed() {
    return (
        <div>
          <StoryReel />
          <MessageSender />
          {
            postsData.map(entry => (
                <Post
                  profilePic={entry.avatar}
                  message={entry.text}
                  timestamp={entry.timestamp}
                  imgName={entry.imgName}
                  username={entry.user}
                />
            ))
          }
        </div>
    );
};

export default Feed;

import React, { useState } from 'react'
import { Avatar, Input } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './MessageSender.css';

function MessageSender() {
    const [input, setInput]= useState('');
    const [image, setImage]= useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleSubmit = () => {
        console.log('submitting');
    }

    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src="https://images-eu.ssl-images-amazon.com/images/I/71frl22CXNL.png" />
                <form>
                    <input
                        type='text'
                        className="messageSender__input"
                        placeholder="What's going on?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Input
                        type="file"
                        className="messageSender__file"
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>Fake Submit</button>
                </form>
            </div>

            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <div className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
};

export default MessageSender;

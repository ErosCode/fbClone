import React from 'react'
import { Avatar } from '@material-ui/core';

function MessageSender() {
    const [input, setInput]=useState('');
    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src="https://images-eu.ssl-images-amazon.com/images/I/71frl22CXNL.png" />
                <form>
                    <input
                        type='text'
                        className="messageSender__input"
                        placeholder="what's going on?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Input type="file" className="messageSender__file" />
                    <button type="submit" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    )
};

export default MessageSender;

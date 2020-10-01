import React from 'react'
import Story from '../Story';
import './StoryReel.css';

function StoryReel() {
    return (
        <div className="storyReel">
            <Story
            image='https://www.hindustantimes.com/rf/image_size_444x250/HT/p2/2020/07/14/Pictures/_1928ec2a-c5b4-11ea-a57f-96923ad3ab86.jpg'
            profileSrc='https://images-eu.ssl-images-amazon.com/images/I/71frl22CXNL.png'
            title="Ayaya Ayaya"
            />
            <Story
            image='https://www.hindustantimes.com/rf/image_size_444x250/HT/p2/2020/07/14/Pictures/_1928ec2a-c5b4-11ea-a57f-96923ad3ab86.jpg'
            profileSrc='https://images-eu.ssl-images-amazon.com/images/I/71frl22CXNL.png'
            title="Ouloulou oulou"
            />
            <Story
            image='https://www.hindustantimes.com/rf/image_size_444x250/HT/p2/2020/07/14/Pictures/_1928ec2a-c5b4-11ea-a57f-96923ad3ab86.jpg'
            profileSrc='https://images-eu.ssl-images-amazon.com/images/I/71frl22CXNL.png'
            title="Palala palala"
            />
        </div>
    )
}

export default StoryReel

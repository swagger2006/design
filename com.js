
// Initial tweets data
let tweets = [
    {
        id: 1,
        username: 'Aruni Sharma',
        handle: '@arunisharma',
        content: 'Just learned HTML, CSS, and JavaScript! 🚀 #coding #webdev',
        likes: 50000,
        retweets: 200,
        replies: 1,
        time: '1h'
    },
    {
        id: 2,
        username: 'nigam',
        handle: '@nigam',
        content: 'any football ground near anandpur? ',
        likes: 24,
        retweets: 3,
        replies: 2,
        time: '4h'
    },
    {
        id: 3,
        username: 'raunak',
        handle: '@raunak raj',
        content: 'chess !',
        likes: 50,
        retweets: 3,
        replies: 2,
        time: '9h'
    },
    {
        id: 4,
        username: 'rastogi',
        handle: '@shivam Rastogi',
        content: 'sleep',
        likes: 32,
        retweets: 5,
        replies: 45,
        time: '2d'
    }
];

// Function to create tweet HTML
function createTweetHTML(tweet) {
    return `
        <div class="tweet">
            <div class="tweet-header">
                <div class="avatar"></div>
                <div class="user-info">
                    <span class="user-name">${tweet.username}</span>
                    <span class="user-handle">${tweet.handle}</span>
                    <span class="tweet-time">· ${tweet.time}</span>
                </div>
            </div>
            <div class="tweet-content">
                ${tweet.content}
            </div>
            <div class="tweet-engagement">
                <div class="engagement-action reply">
                    💬 <span>${tweet.replies}</span>
                </div>
                <div class="engagement-action retweet">
                    🔄 <span>${tweet.retweets}</span>
                </div>
                <div class="engagement-action like">
                    ❤️ <span>${tweet.likes}</span>
                </div>
                <div class="engagement-action">
                    📤
                </div>
            </div>
        </div>
    `;
}

// Function to render tweets
function renderTweets() {
    const tweetFeed = document.getElementById('tweetFeed');
    tweetFeed.innerHTML = tweets.map(tweet => createTweetHTML(tweet)).join('');
}

// Function to post new tweet
function postTweet() {
    const tweetInput = document.getElementById('tweetInput');
    const content = tweetInput.value.trim();
    
    if (content) {
        const newTweet = {
            id: tweets.length + 1,
            username: 'Current User',
            handle: '@currentuser',
            content: content,
            likes: 0,
            retweets: 0,
            replies: 0,
            time: 'now'
        };

        tweets.unshift(newTweet);
        renderTweets();
        tweetInput.value = '';
    }
}

// Initialize feed
renderTweets();

// Add event listener for Enter key in textarea
document.getElementById('tweetInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        postTweet();
    }
});
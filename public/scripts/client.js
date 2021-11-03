const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
/* Client-side JS logic goes here*/
//jQuery's document ready function will execute once info is available
$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  //creates new tweets within tweet container
  const createTweetElement = function(tweet) {
    const createdAt = timeago.format(tweet.created_at);
    const $tweet = $(`<article class="tweet">
    <header class="tweet_header">
      <div class="user_icon">
        <img src=${tweet.user.avatars}></img>
        ${tweet['user'].name}
      </div>
      <div class="tweet_handle">
      ${tweet['user'].handle}
      </div>
    </header>
    <div class="tweet_body">
      <h4> ${tweet['content'].text}</h4>
    </div>
    <footer class="tweet_footer">
      <div class="timestamp">
      ${createdAt}
      </div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
      </footer>
      </article>`);
    return $tweet;
  };
  const $tweet = createTweetElement(tweetData);

  console.log("container", $('#tweets-container'));
  //adds new tweets to top of container
  $('#tweets-container').prepend($tweet); 
  //filler data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  // loops through tweets & calls createTweetElement for each tweet
  const renderTweets = function(tweets) {
    const tweetContainer = $("#tweets-container");
    //removes all child nodes before repopulating
    tweetContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      tweetContainer.prepend($tweet);
    }
  };
  renderTweets(data);
  //hides error elements
  $("#empty_error").hide();
  $("#length_error").hide();

  //add an event listener that listens for the submit event
  $('#tweet-form').on('submit', function(event) {
    //prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
    const serializeData = $(this).serialize();
    const $textLength = $('#tweet-text').val().length;
    if ($textLength > 0 && $textLength <= 140) {
      $("#empty_error").hide();
      $("#length_error").hide();
      return;
    }
    //error for an empty tweet
    if ($textLength === 0 || $textLength === null) {
      $("#empty_error").slideDown();
      $("#length_error").hide();
      return;
    }
    //error for a tweet exceeds length
    if ($textLength > 140) {
      $("#length_error").slideDown();
      $("#empty_error").hide();
      return;
    }
    //AJAX POST REQUEST
    $.ajax({
      url: "/tweets",
      method: 'POST',
      //Serialize the form data
      data: serializeData,
      success: (tweets) => {
        loadTweets();
        console.log('succes');
      },
      error: (err) => {
        console.log('There was an error:', `${err}`);
      }
    });
  });
  
  $('#tweet-text').on('input', function(event) {
    if (event.target.value.length <= 140) {
      $("#length_error").slideUp();
      $("#empty_error").slideUp();
    }
  })

  //AJAX GET REQUEST
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: (tweets) => {
        console.log('data:', tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.log('There was an error:', `${err}`);
      }
    });
  };
  loadTweets();
});
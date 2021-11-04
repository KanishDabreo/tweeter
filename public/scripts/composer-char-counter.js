//This file will be solely responsible for this character counter.
const MAX_TWEET_LENGTH = 140;
$(document).ready(function() {
  // --- our code goes here ---
  const $textarea = $('#tweet-text');
  $textarea.on('input', (event) => {
    //  console.log("test input", event);
    const textValue = $textarea.val();
    //console.log(textValue);
    const textLength = textValue.length;
    //console.log(textLength)
    const charRemaining = MAX_TWEET_LENGTH - textLength;
    console.log(charRemaining);
    //select using jquery

    const $counter = $('#counter');
    $counter.val(charRemaining);
    if (charRemaining < 0) {
      $('#counter').css({
        'color': 'red'
      });
    }
    else {
      $('#counter').css({
        'color': 'black'
      });
    }
  });
});

/* Unlike the keypress event, the KEYDOWN event is fired for all keys, regardless of whether they produce a character value. */

/* The change event is fired for <input>, <select>, and <textarea> elements when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value. */
/**
 * App namespace.
 * @type {object}
 */
var YouTubeOnRepeatApp = {};
YouTubeOnRepeatApp.LOCAL_STORE_ID = 'YouTubeOnRepeatApp_StoreKey';

/**
 * Message Listner
 * @param {object} request
 * @param {object} sender
 * @param {object} respond
 */
youtubeOnRepeatApp.messageListener = function (request, sender, respond) {
    console.log(request);
    if (request.action == 'getRepeatUrl') {
        console.log('Request I got:' + request);
        console.log('Request was sent by: ' + sender);
        respond({ repeatUrl: 'Some Response'});
    }
};

/**
 * Gets value from localStorage.
 * @return {string} stored value.
 */
youtubeOnRepeatApp.getStoredValue = function () {
    return localStorage[this.LOCAL_STORE_ID];
};

/**
 * Stores the value to localStorage.
 * @param {string} value
 * @return {string} stored value.
 */
youtubeOnRepeatApp.setStoredValue = function (value) {
    localStorage[this.LOCAL_STORE_ID] = value;
    return this.getStoredValue();
};

YouTubeOnRepeatApp.init = function () { 
  console.log('I am Loaded!');
};

YouTubeOnRepeatApp.init();

// Setting up listeners
chrome.runtime.onMessage.addListener(youtubeOnRepeatApp.messageListener);

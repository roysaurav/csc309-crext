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
YouTubeOnRepeatApp.messageListener = function (request, sender, respond) {
    console.log(request);
    if (request.action == 'getRepeatUrl') {
        console.log('Request I got:' + request);
        console.log('Request was sent by: ' + sender);
        respond({ repeatUrl: 'Some Response'});
    }
    if (request.action == 'toggle') {
        console.log('I need to toggle');
        if (this.getStoredValue() == 'true') {
            this.setStoredValue('false');
        } else {
            this.setStoredValue('true');
        }
        respond({ status: this.getStoredValue() });
    }
};

/**
 * Gets value from localStorage.
 * @return {string} stored value.
 */
YouTubeOnRepeatApp.getStoredValue = function () {
    return localStorage[this.LOCAL_STORE_ID];
};

/**
 * Stores the value to localStorage.
 * @param {string} value
 * @return {string} stored value.
 */
YouTubeOnRepeatApp.setStoredValue = function (value) {
    localStorage[this.LOCAL_STORE_ID] = value;
    return this.getStoredValue();
};

YouTubeOnRepeatApp.init = function () { 
    console.log('I am Loaded!');
    this.setStoredValue('false');
};

YouTubeOnRepeatApp.requestCallback = function(details) {
    if (this.getStoredValue() == 'true') {
        console.log()
        return { redirectUrl: 'http://youtubeonrepeat.com' };
    }
};

YouTubeOnRepeatApp.init();

// Setting up listeners
chrome.runtime.onMessage.addListener(YouTubeOnRepeatApp.messageListener.bind(YouTubeOnRepeatApp));

chrome.webRequest.onBeforeRequest.addListener(
  YouTubeOnRepeatApp.requestCallback.bind(YouTubeOnRepeatApp),
  // Applies to following url patterns
  {urls: ['*://*.youtube.com/*']},
  // In request blocking mode
  ['blocking']
);
/**
 * App namespace.
 * @type {object}
 */
var youtubeOnRepeatApp = {};

// Some constants
youtubeOnRepeatApp.URL_BASE = 'http://youtubeonrepeat.com/watch?v=';
youtubeOnRepeatApp.LOCAL_STORE_ID = 'youtube_on_repeat_app';

/**
 * Extracts parameters from the url string.
 * @param {string} param
 * @param {string} string
 * @return {string} param value.
 */
youtubeOnRepeatApp.urlParamExtract = function (param, string) {
    var results = new RegExp('[\\?&amp;]' + param + '=([^&#$]*)').exec(string);
    return results[1] || 0;
};

/**
 * Creates Youtube on repeat link.
 * @param {string} url
 * @return {string} new url.
 */
youtubeOnRepeatApp.createRepeatLink = function (url) {
    console.log(url);
    return this.URL_BASE + this.urlParamExtract('v', url);
}

/**
 * Message Listner
 * @param {object} request
 * @param {object} sender
 * @param {object} respond
 */
youtubeOnRepeatApp.messageListener = function (request, sender, respond) {
    console.log(request);
    if (request.action == 'getRepeatUrl' && request.url != null) {
        console.log('Request I got:' + request);
        console.log(this.createRepeatLink(request.url));
        respond({ repeatUrl: this.createRepeatLink(request.url) });
    }
    if (request.action == 'toggle') {
        console.log('Toggling');
        respond({ status: this.toggle() });
    }
    if (request.action == 'getStatus') {
        console.log('Returning Status');
        respond({ status: this.getStoredValue() });
    }
};

/**
 * Toggles the stored value.
 * @return {string} stored value
 */
youtubeOnRepeatApp.toggle = function () {
    if (this.getStoredValue() == 'true') {
        this.setStoredValue('false');
    } else {
        this.setStoredValue('true');
    }
    return this.getStoredValue();
}

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


/**
 * Checks if we need to redirect.
 * @return {boolean}
 */
youtubeOnRepeatApp.requiresRedirect = function () {
    return (this.getStoredValue() == 'true');
};

/**
 * Handles the youtube loading request.
 * @param {object} info
 * @return {boolean}
 */
youtubeOnRepeatApp.youtubeLoadingListener = function (info) {
    if (this.requiresRedirect()) {
        return { redirectUrl: this.createRepeatLink(info.url) };
    }
    return false;
};

/**
 * Init Method
 */
youtubeOnRepeatApp.init = function () {
    console.log('I was loaded');
    // Reloading the app should not change this value.
    if (this.getStoredValue() == null) {
        this.setStoredValue('false');
    }
};

// Init
youtubeOnRepeatApp.init();

// Setting up listeners
chrome.runtime.onMessage.addListener(youtubeOnRepeatApp.messageListener.bind(youtubeOnRepeatApp));

chrome.webRequest.onBeforeRequest.addListener(
  youtubeOnRepeatApp.youtubeLoadingListener.bind(youtubeOnRepeatApp),
  // Applies to following url patterns
  {urls: ['*://*.youtube.com/watch*']},
  // In request blocking mode
  ['blocking']
);
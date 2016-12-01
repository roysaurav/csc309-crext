/**
 * App namespace.
 * @type {object}
 */
var YouTubeOnRepeatApp = {};

// Some Constants
youtubeOnRepeatApp.URL_BASE = 'http://youtubeonrepeat.com/watch?v=';
YouTubeOnRepeatApp.ICON_DATA_URL =
  'data:image/png;base64,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';

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
 * Creates a repeat button.
 * @param {string} repeatUrl
 * @return {string} html element as string.
 */
youtubeOnRepeatApp.createRepeatButton = function () { 
    return '<img src="' + this.ICON_DATA_URL + '">';
};

/**
 * Gets user info container.
 * @return {object} element
 */
youtubeOnRepeatApp.getUserInfoContainer = function () {
    
};

/**
 * Adds repeat button to page.
 * @param {object} button
 */
youtubeOnRepeatApp.addRepeatButton = function (button) {
    
}

YouTubeOnRepeatApp.init = function () { 
  console.log('I am Loaded');
};

YouTubeOnRepeatApp.init();
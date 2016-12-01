YouTubeOnRepeatApp = {};

YouTubeOnRepeatApp.init = function () {
    console.log("Yaye");
};


YouTubeOnRepeatApp.extractURLParams = function (param, string) {
    var results = new RegExp('[\\?&amp;]' + param + '=([^&#$]*)').exec(string);
    return results[1] || 0;
};

YouTubeOnRepeatApp.createRepeatLink = function () {
  return 'http://www.youtubeonrepeat.com/watch?v=' +
    this.extractURLParams('v', window.location.href);
};
 
YouTubeOnRepeatApp.someListener = function (request, sender, sendResponse) {
    if (request.action == 'getMeRepeatLink' && request.url != null) {
        sendResponse({repeatLink: this.createRepeatLink(request.url)});
    }
};

YouTubeOnRepeatApp.init();

chrome.runtime.onMessage.addListener(
    YouTubeOnRepeatApp.someListener
);
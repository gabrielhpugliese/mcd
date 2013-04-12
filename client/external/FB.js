(function(d, debug){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/pt_BR/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ true));

window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '442486029172550', // App ID from the App Dashboard
      // channelUrl : '//localhost:3000/channel.html', // Channel File for x-domain communication
      channelUrl : 'https://troqueselosdomcd.meteor.com/channel.html', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true,  // parse XFBML tags on this page?
      frictionlessRequests : true,
    });
};


(function() {
    $SA = {
        s : 18646,
        asynch : 1
    };
    (function() {
        var sa = document.createElement("script");
        sa.type = "text/javascript";
        sa.async = true;
        sa.src = ("https:" == document.location.protocol ? "https://" + $SA.s + ".sa" : "http://" + $SA.s + ".a") + ".siteapps.com/" + $SA.s + ".js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(sa, t);
    })();
})();

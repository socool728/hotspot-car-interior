"use strict";

var hc_$ = jQuery.noConflict(true);

function hc_(options) {
    this.events = {};
    var targetUrl = options.targetUrl;
    var clientId = options.clientId;
    var prod = options.prod;
    var hc_this = this;

    /* hip tag */
    var tag = (prod) ? "//d22ylnb9mzp7pk.cloudfront.net/hc.js" : "http://d3amtlegn78fof.cloudfront.net/hc.js";
    var collector = (prod) ? "d2a4czoz73olwb.cloudfront.net" : "d2tk74n3r5zahw.cloudfront.net";
    var rnd = Math.random().toString(36).substring(2);

    (function(p, l, o, w, i, n, g) {
        if (!p[i]) {
            p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
            p.GlobalSnowplowNamespace.push(i);
            p[i] = function() {
                (p[i].q = p[i].q || []).push(arguments);
            };
            p[i].q = p[i].q || [];
            n = l.createElement(o);
            g = l.getElementsByTagName(o)[0];
            n.async = 1;
            n.src = w;
            g.parentNode.insertBefore(n, g);
        }
    }(window, document, "script", tag, "hc_hipTagTracker"));

    window.hc_hipTagTracker('newTracker', rnd, collector);
    window.hc_hipTagTracker('trackAdImpression:' + rnd, '%augmeid%', '', '', targetUrl, '%ad_id%', '', clientId, '%c%');

    /* other tags */
    hc_$("#hc_richmedia").append(hc_$("img").attr('src', 'http://ad.doubleclick.net/ad/N1413.285074.HIPCRICKET/B8146705.4;sz=1x1;ord=%ts%?').css({
        'position': 'absolute',
        'height': '1px',
        'width': '1px'
    }));
    hc_$("#hc_richmedia").append(hc_$("img").attr('src', 'https://ace.adoftheyear.com/p22264/tagger_v03.php?project=p22264&tag=1a&channel=[sid=4_HC_F1_4a|cid=4001|]').css({
        'position': 'absolute',
        'height': '1px',
        'width': '1px'
    }));


    /* COMMON LIBRARIES USED BY RICH MEDIA */

    /* open and close functionality */
    hc_$(function() {
        hc_$("#hc_richmedia  .hc_initial_view .hc_expand").on('click', function(e) {
            e.stopPropagation();
            if ("undefined" !== typeof mraid) {
                mraid.useCustomClose(true);
                mraid.expand();
            }

            hc_$("#hc_richmedia .hc_initial_view").hide();
            hc_$("#hc_richmedia .hc_content").show();
            hc_$("#hc_richmedia .hc_closebtn").show();

            /* tracking */
            window.hc_hipTagTracker('trackStructEvent:' + rnd, 'navigation', 'open');
            hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', '#trk:expansion#?cb=' + (new Date()).getTime() + '\'').css({
                'position': 'absolute',
                'height': '1px',
                'width': '1px'
            }));
            if (getSQP("exp")) {
                hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', decodeURIComponent(getSQP("exp")) + "&cb=" + (new Date()).getTime()).css({
                    'position': 'absolute',
                    'height': '1px',
                    'width': '1px'
                }));
            }

            if (typeof(hc_this.events.hc_expand_after) === "function") {
                hc_this.events.hc_expand_after.apply(this);
            }
            return false;
        });

        /* close */
        hc_$("#hc_richmedia .hc_content .hc_closebtn").on('click', function(e) {
            e.stopPropagation();
            if ("undefined" !== typeof mraid) {
                mraid.close();
            }
            hc_$("#hc_richmedia .hc_content").hide();
            hc_$("#hc_richmedia .hc_closebtn").hide();
            hc_$("#hc_richmedia .hc_initial_view").show();

            /* tracking */
            window.hc_hipTagTracker('trackStructEvent:' + rnd, 'navigation', 'close');
            hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', '#trk:collapse#?cb=' + (new Date()).getTime() + '\'').css({
                'position': 'absolute',
                'height': '1px',
                'width': '1px'
            }));

            if (typeof(hc_this.events.hc_closebtn_after) === "function") {
                hc_this.event.hc_closebtn_after.apply(this);
            }
            return false;
        });

        if ("undefined" !== typeof mraid) {
            mraid.addEventListener("stateChange", function() {
                switch (mraid.getState()) {
                    case "expanded":
                        hc_$("#hc_richmedia  .hc_initial_view .hc_expand").click();
                        break;
                    case "default":
                        hc_$("#hc_richmedia .hc_content .hc_closebtn").click();
                }
            });
        }
    });

    /* Rich media tabs */
    hc_$(function() {
        hc_$(".hc_tabs_button a").on('click', function() {
            hc_$(".hc_tabs_button div").removeClass("active");
            hc_$(this).parent().addClass("active");

            var contentTab = '';
            var classList = hc_$(this).parent().prop('class').split(/\s+/);
            hc_$.each(classList, function(index, item) {
                if (item.indexOf('hc_tabs_button_') != -1) {
                    contentTab = item.replace('button', 'content');
                }
            });
            hc_$(".hc_tabs_content").hide();
            hc_$("." + contentTab).show();
            hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', '#trk:events#?cb=' + (new Date()).getTime() + '\'').css({
                'position': 'absolute',
                'height': '1px',
                'width': '1px'
            }));
            window.hc_hipTagTracker('trackStructEvent:' + rnd, 'navigation', hc_$(this).html(), hc_$(this).attr('href'));

            if (typeof(hc_this.events.hc_closebtn_after) === "function") {
                hc_this.events.hc_expand.apply(this);
            }

            if (typeof(hc_this.events.hc_tabs_button_after) === "function") {
                hc_this.events.hc_tabs_button_after.apply(this);
            }
        });
    });

    /* anchor tracking */
    hc_$(function() {
        hc_$("#hc_richmedia").on('click', "a", function() {
            if ((hc_$(this).attr('href').length > 0) && (hc_$(this).attr('href') != '#')) {
                window.hc_hipTagTracker('trackStructEvent:' + rnd, 'navigation', hc_$(this).html(), hc_$(this).attr('href'));
                setTimeout('document.location = "' + hc_$(this).attr('href') + '"', 500);
                return false;
            }
        });
    });


    /* COMMON FUNCTION USED FOR RICH MEDIA */
    function getQP(a) {
        if (window.location && "string" === typeof window.location.search) {
            var e = window.location.search.substr(1).split("&"),
                c, d;
            for (d = 0; d < e.length; d++)
                if (c = e[d].split("="), 2 === c.length && c[0] === a) return decodeURI(c[1]);
        }
        return !1;
    }

    function getSQP(b) {
        var src = hc_$("script[src*='as.aug.me']").attr("src");
        if (src) {
            var e = src.split("?");
            if (1 < e.length) {
                e = e[1].split("&"),
                c, d;
                for (d = 0; d < e.length; d++)
                    if (c = e[d].split("="), 2 === c.length && c[0] === b) return decodeURI(c[1]);
            }
        }
        return !1;
    }

    this.test1 = function(a) {
        console.log('test1 happened!' + a);
    }
}
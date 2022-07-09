"use strict";

var hc_$ = jQuery.noConflict(true);

function hc_(options) {
	this.events = {};
	this.version = "0.2";
	var hc_this = this;
	var oldTracking = options.track.split('expansion');

	/* hip tag */
	/*var tag = (options.prod) ? "//d22ylnb9mzp7pk.cloudfront.net/v2/hc.js" : "//d3amtlegn78fof.cloudfront.net/v2/hc.js";*/
    var tag = (options.prod) ? "" : "";
	/*var collector = (options.prod) ? "d2a4czoz73olwb.cloudfront.net" : "d2tk74n3r5zahw.cloudfront.net";*/
    var collector = (options.prod) ? "" : "";
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
	window.hc_hipTagTracker('enableActivityTracking', 10, 10);
	window.hc_hipTagTracker('trackAdImpression:' + rnd, options.augmeId, '', '', options.targetUrl, options.adId, '', options.clientId, options.campaignId);

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
			hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', oldTracking[0] + 'expansion' + oldTracking[1] + '?cb=' + (new Date()).getTime() + '\'').css({
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

			startExpandTimer();

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
			hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', oldTracking[0] + 'collapse' + oldTracking[1] + '?cb=' + (new Date()).getTime() + '\'').css({
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
			hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', oldTracking[0] + 'events' + oldTracking[1] + '?cb=' + (new Date()).getTime() + '\'').css({
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
				var anchor = this;
				if (hc_$(anchor).attr("target") == "_blank") {

					/* we don't need a timer here since we are not actually leaving this page */
					window.hc_hipTagTracker('trackLinkClick:' + rnd, hc_$(this).attr('href'));
					hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', oldTracking[0] + 'click' + oldTracking[1] + '?cb=' + (new Date()).getTime() + '\'').css({
						'position': 'absolute',
						'height': '1px',
						'width': '1px'
					}));
					return true;
				} else {

					/* need to have a timer to make sure it's actually gets executed before leaving */
					window.hc_hipTagTracker('trackLinkClick:' + rnd, hc_$(this).attr('href'));
					hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', oldTracking[0] + 'click' + oldTracking[1] + '?cb=' + (new Date()).getTime() + '\'').css({
						'position': 'absolute',
						'height': '1px',
						'width': '1px'
					}));

					setTimeout(function () {
						document.location = hc_$(anchor).attr('href');
					}, 700);
					return false;
				}
			}

		});
	});


	/* COMMON FUNCTION USED FOR RICH MEDIA */
	function startExpandTimer() {
		var x = 0, stop = 0;
		var tagMagic = setInterval(function(){summonTag()},10000);

		function summonTag () {
			if (x <= 50) {
				x = x + 10;
				hc_$("#hc_richmedia").append('<img src="' + oldTracking[0] + 'timer-' + x + '-seconds' + oldTracking[1] + '?cb=' + new Date().getTime() + '" style="position:absolute;height:1px;width:1px;" />');
			} else {
				clearInterval(tagMagic);
			}
		}
	}

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
				e = e[1].split("&");
				var c;
				var d;
				for (d = 0; d < e.length; d++)
					if (c = e[d].split("="), 2 === c.length && c[0] === b) return decodeURI(c[1]);
			}
		}
		return !1;
	}

	this.trackGeneralClickEvent = function(category, action, label, property, value) {
		var adServeTag = category;
		if (typeof action !== 'undefined') {
			adServeTag += '_' + action;
		}
		if (typeof label !== 'undefined') {
			adServeTag += '_' + label;
		}
		if (typeof property !== 'undefined') {
			adServeTag += '_' + property;
		}
		if (typeof value !== 'undefined') {
			adServeTag += '_' + value;
		}

		window.hc_hipTagTracker('trackStructEvent:' + rnd, category, action, label, property, value);
		hc_$("#hc_richmedia").append(hc_$("<img>").attr('src', oldTracking[0] + adServeTag + oldTracking[1] + '?cb=' + (new Date()).getTime() + '\'').css({
			'position': 'absolute',
			'height': '1px',
			'width': '1px'
		}));
	};

	this.test1 = function(a) {
		console.log('test1 happened!' + a);
	}
}
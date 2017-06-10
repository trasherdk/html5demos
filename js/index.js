/**
 * Created by WIN8.1 PRO on 2017-06-10.
 */

(function() {
	
	var tags = [];
	$(document).delegate('span.tag', 'click', function () {
		var $tag = $(this), tag = $tag.text(), type = $tag.closest('td').attr('class') || 'tags';
		
		if ($tag.is('.selected')) {
			$('.' + type + ' span:contains(' + tag + ')').removeClass('selected');
		} else {
			$('.' + type + ' span:contains(' + tag + ')').addClass('selected');
		}
		
		// it's an AND filter
		var $trs = $('.' + type + ':has(span.selected)').closest('tr');
		if ($trs.length) {
			$('tbody tr').hide();
			$trs.show();
		} else {
			$('tbody tr').show();
		}
	});
	
	var html = [];
	$('.tags span.tag').each(function () {
		var $tag = $(this), tag = $tag.text();
		
		if (!tags[tag]) {
			tags[tag] = true;
			html.push('<span class="tag">' + tag + '</span> ');
		}
	});
	
	$('#tags').append('<strong>Filter demos:</strong> ' + html.sort().join(''));
	
	$.getJSON('demos.json', function (data) {
		var i = data.length, $test;
		while (i--) {
			if (data[i].test && (new Function('return ' + data[i].test))()) {
				$('#test-' + data[i].url).addClass('supported').attr('title', 'your browser is supported');
			} else if (data[i].test) {
				$('#test-' + data[i].url).addClass('not-supported').attr('title', 'your browser is NOT supported');
			}
		}
	});

// $('tr td.demo').click(function () {
//   window.location = $(this).find('a').attr('href');
// });

}());
/**
var _gaq = [['_setAccount', 'UA-1656750-18'], ['_trackPageview']];
(function(d, t) {
	var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
	g.async = 1;
	g.src = '//www.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g, s);
}(document, 'script'));
**/
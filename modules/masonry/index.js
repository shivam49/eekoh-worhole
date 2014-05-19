'use strict';

var $ = require('jquery');
var freewall = require('freewall');

$(function() {
	var wall = new freewall("#freewall");
	wall.reset({
		selector: '.brick',
		animate: true,
		cellW: 160,
		cellH: 160,
		delay: 0,
		onResize: function() {
			wall.fitWidth();
		}
	});
	wall.fitWidth();

	var temp = '<div class="brick {size}" style="background-color: {color}"><div class="cover"></div></div>';
	var size = "size23 size22 size21 size13 size12 size11".split(" ");
	$(".add-more").click(function() {
		var	html = temp.replace('{size}', size[size.length * Math.random() << 0])
		.replace('{color}', colour[colour.length * Math.random() << 0]);
	wall.prepend(html);
	});
});

import Vue from 'vue';
export const EventBus = new Vue();


// var ev = {
// 	click: [
// 		{
// 			target: ".whatever",
// 			handler: function(e) {
// 				console.log(".whatever was clicked");
// 			}
// 		},
// 		{
// 			target: "h1",
// 			handler: function(e) {
// 				console.log("h1 was clicked");
// 			}
// 		},
		
// 	],
// 	mouseover: [
// 		{
// 			target: "a",
// 			handler: function(e) {
// 				console.log("This is a hovered link!")
// 			}
// 		}
// 	]
// };

// for (var event in ev) {
// 	let arr = ev[event];
// 	window.addEventListener(event, function(e) {
// 		for (var x = 0, l = arr.length; x < l; x++) {
// 			let item = arr[x];
// 			if (e.target.matches(item.target)) {
// 				if (typeof item.handler == 'function') arr[x].handler(e)
// 			}
// 		}
// 	});
// }
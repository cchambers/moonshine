import Vue from 'vue';
export const EventBus = new Vue();

export default {
  name: 'EventBus',
}

var ev = {
	click: [
		{
			target: "[close-trigger]",
			handler: function(e) {
				EventBus.$emit('close-modals');
			}
    }
  ]
};

for (var event in ev) {
	document.addEventListener(event, function(e) {
    let arr = ev[event];
		for (var x = 0, l = arr.length; x < l; x++) {
			let item = arr[x];
			if (e.target.matches(item.target)) {
				if (typeof item.handler == 'function') arr[x].handler(e)
			}
		}
	});
}
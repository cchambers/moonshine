import Vue from 'vue';
export const EventBus = new Vue();

export default {
  name: 'EventBus',
}

var delegations = {
	click: [
		{
			target: "[close-trigger]",
			handler() {
				EventBus.$emit('close-modals');
			}
    }
	],
	mouseover: []
};

function bindAll() {
	for (var event in delegations) {
		handleEvent(event);
	}
}

function handleEvent(event) {
// create a new listener... 
	document.addEventListener(event, function(e) {
				
		let arr = delegations[event];

		// for every item that needs to be watched on *event*
		for (var x = 0, l = arr.length; x < l; x++) {

			if (e.target.matches(arr[x].target)) arr[x].handler(e)

		}

	});
}



function listen(event, target, handler, firebinds = false) {
	if (!event || !target || typeof handler != 'function') {
		return false;
	}

	let exists = delegations[event];
	if (!exists) {
		delegations[event] = [];
		firebinds = true;
	}

	delegations[event].push({
		target: target,
		handler: handler
	})

	if (firebinds) handleEvent(event);
	
	return true
}

bindAll();
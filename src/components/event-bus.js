/* eslint-disable */

import Vue from 'vue';
export const EventBus = new Vue();

export default {
	name: 'EventBus',
	created() {
		console.log("EB HERE")
	}
}

// TODO: Create a mechanism for collecting events during page load and emit them with a hash or something -- maybe only emit as new components load in... 


var delegations = {
	click: [
		{
			target: "[close-trigger]",
			priority: 1,
			handler() {
				EventBus.$emit('close-modals');
			}
		},
		{
			target: "[nav-trigger]",
			handler() {
				EventBus.$emit('show-nav');
			}
    }
	]
};

function bindAll() {
	let self = this;
	for (var event in delegations) {
		setupEvent(event);
	}

	window.addEventListener('hashchange', () => {
		EventBus.$emit('hashchange', window.location.hash.substr(1));
	})
}

function setupEvent(event) {
// create a new listener... 
	document.addEventListener(event, function(e) {
		let arr = delegations[event];
		// for every item that needs to be watched on *event*
		for (var x = 0, l = arr.length; x < l; x++) {
			if (e.target.matches(arr[x].target)) arr[x].handler(e)

			// TODO: if (arr[x].stopProp...) return;
		}
	});
}

function listen(event, target, handler, options) {
	if (!event || !target || typeof handler != 'function') {
		return false;
	}

	let exists = delegations[event];
	if (!exists) {
		delegations[event] = [];
		options.configure = true;
	}

	let obj = {
		target: target,
		handler: handler
	};

	if (options.priority) obj.priority = options.priority;

	delegations[event].push(obj);

	if (options.configure) setupEvent(event);
	
	return true
}

bindAll();

function sh(el) {
	return [el].__vue_custom_element__.$children[0];
}
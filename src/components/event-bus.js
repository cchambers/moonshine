/* eslint-disable */

import Vue from 'vue';
export const EventBus = new Vue();

export default {
  name: 'EventBus',
}

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
	],
	mouseover: [

	]
};

function bindAll() {
	for (var event in delegations) {
		setupEvent(event);
	}
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

function listen(event, target, handler, priority, configure = false) {
	if (!event || !target || typeof handler != 'function') {
		return false;
	}

	let exists = delegations[event];
	if (!exists) {
		delegations[event] = [];
		configure = true;
	}

	let obj = {
		target: target,
		handler: handler
	};

	if (priority) obj.priority = priority;

	delegations[event].push(obj);

	if (configure) setupEvent(event);
	
	return true
}

bindAll();
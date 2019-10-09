/* eslint-disable */

import Vue from 'vue';
export const EventBus = new Vue();

export default {
	name: 'EventBus'
}

// TODO: This batches the initial events before page load. 
let batch = [];
let preload = true;
setTimeout(function () { 
	preload = false;
	// console.log(batch); <-- could potentially re-emit these if needed.
});

const baseEmit = EventBus.$emit;
EventBus.$emit = (...args) => {
	let event = args[0];
	if (preload && event !== 'component-ready') batch.push(event);
	baseEmit.apply(EventBus, args);
};

let delegations = {
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
				this.$bus.$emit('show-curtain');
			}
    }
	]
};

function bindAll() {
	for (let event in delegations) {
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
		for (let x = 0, l = arr.length; x < l; x += 1) {
			if (e.target.matches) {
				if (e.target.matches(arr[x].target)) arr[x].handler(e)
			} else if (e.target.msMatchesSelector) {
				if (e.target.msMatchesSelector(arr[x].target)) arr[x].handler(e)
			}
			// TODO: if (arr[x].stopProp...) return;
		}
	});
}

function listen(event, target, handler, options) {
	if (!event || !target || typeof handler !== 'function') {
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

window.sh = function(el) {
	return el.__vue_custom_element__.$children[0];
}
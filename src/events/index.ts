export const on = (eventType: string, listener: EventListener) => {
	document.addEventListener(eventType, listener);
};

export const off = (eventType: string, listener: EventListener) => {
	document.removeEventListener(eventType, listener);
};

export const once = (eventType: string, listener: EventListener) => {
	const handleEventOnce = (event: Event) => {
		listener(event);
		off(eventType, handleEventOnce);
	};
	on(eventType, handleEventOnce);
};

export const trigger = (eventType: string, data?: any) => {
	const event = new CustomEvent(eventType, { detail: data });
	document.dispatchEvent(event);
};

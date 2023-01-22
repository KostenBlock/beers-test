export default class EventHelperUtils {
	private timeout: number = 1000;
	debounce(callback: Function, delay: number) {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(callback, Number(delay));
	}
}

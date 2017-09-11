export default class CoreHelper {
	/**
	 * define common utility or misc functions here
	 */
	toFixed(num, scale = 2) {
		if (!(`${num}`).includes('e')) {
			return +(`${Math.round(`${num}e${scale}`)}e-${scale}`);
		} else {
			const arr = (`${num}`).split('e');
			let sig = '';
			if (+arr[1] + scale > 0) {
				sig = '+';
			}
			return +(`${Math.round(`${+arr[0]}e${sig}${+arr[1] + scale}`)}e-${scale}`);
		}
	}
}
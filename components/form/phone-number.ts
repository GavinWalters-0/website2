export function cleanPhoneNumber(phoneNumber: string) {
	return phoneNumber.replaceAll(/\D/g, '');
}

export function formatPhoneNumber(phoneNumber: string) {
	let formatted = phoneNumber;
	// strip the country code if there is one
	if (phoneNumber.startsWith('+1')) {
		formatted = formatted.substring(2);
	}

	// remove other characters
	formatted = cleanPhoneNumber(formatted);

	if (formatted.length !== 10) {
		return phoneNumber;
	}

	const match = formatted.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match === null) {
		return phoneNumber;
	}

	return `(${match[1]}) ${match[2]}-${match[3]}`;
}

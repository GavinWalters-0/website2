import { describe, expect, it } from 'vitest';
import { formatPhoneNumber } from './phone-number';

describe('phone number', () => {
	it('formats valid phone numbers', () => {
		expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
		expect(formatPhoneNumber('+11234567890')).toBe('(123) 456-7890');
		expect(formatPhoneNumber('+1 (123) 456-7890')).toBe('(123) 456-7890');
		expect(formatPhoneNumber('(123) 456-7890')).toBe('(123) 456-7890');
	});

	it('leaves invalid numbers untouched', () => {
		expect(formatPhoneNumber('123123123123123123')).toBe(
			'123123123123123123'
		);
		expect(formatPhoneNumber('abc 123 456')).toBe('abc 123 456');
	});
});

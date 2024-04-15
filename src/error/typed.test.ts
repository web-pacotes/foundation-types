import { describe, expect, test } from '@jest/globals';
import { isTypedError, TypedError, unwrap, wrap } from './typed';
import { UnknownError } from './unknown';

describe('typed', () => {
	describe('isTypedError', () => {
		test('returns true if type literal is the same as of error value', () => {
			const type = 'error';
			const value = TypedError(type, 'system crash');

			const check = isTypedError(value, type);

			expect(check).toBeTruthy();
		});

		test('returns false if type literal is not the same as of error value', () => {
			const type = 'error';
			const value = TypedError(type, 'system crash');

			const check = isTypedError(value, 'not error');

			expect(check).toBeFalsy();
		});

		test('forces type literal inference if generic TypedError is specified', () => {
			const value = UnknownError('system crash');

			const check = isTypedError<UnknownError>(value, 'unknown-error');

			expect(check).toBeTruthy();
		});
	});

	describe('wrap', () => {
		test('wrapping and then unwrapping returns the original TypedError', () => {
			const value = TypedError('error', 'system crash');

			const wrappedUnwrapped = unwrap(wrap(value));

			expect(value).toStrictEqual(wrappedUnwrapped);
		});
	});
});

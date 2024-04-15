import { describe, expect, test } from '@jest/globals';
import { isReadError, isWriteError, ReadError, WriteError } from './io';

describe('io', () => {
	describe('isReadError', () => {
		test('returns true if value is of read-error type', () => {
			const value = ReadError('closed file descriptor');

			const check = isReadError(value);

			expect(check).toBeTruthy();
		});

		test('returns false if value is not of read-error type', () => {
			const value = WriteError('closed file descriptor');

			const check = isReadError(value);

			expect(check).toBeFalsy();
		});
	});

	describe('isWriteError', () => {
		test('returns true if value is of write-error type', () => {
			const value = WriteError('closed file descriptor');

			const check = isWriteError(value);

			expect(check).toBeTruthy();
		});

		test('returns false if value is not of write-error type', () => {
			const value = ReadError('closed file descriptor');

			const check = isWriteError(value);

			expect(check).toBeFalsy();
		});
	});
});

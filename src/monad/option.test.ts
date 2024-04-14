import { describe, expect, test } from '@jest/globals';
import { empty, None, present, Some } from './option';

describe('option', () => {
	describe('present', () => {
		test('returns true if value is present', () => {
			const value = Some(0);

			const isPresent = present(value);

			expect(isPresent).toBeTruthy();
		});

		test('returns false if value is not present', () => {
			const value = None();

			const isPresent = present(value);

			expect(isPresent).toBeFalsy();
		});
	});

	describe('empty', () => {
		test('returns true if value is not present', () => {
			const value = None();

			const isEmpty = empty(value);

			expect(isEmpty).toBeTruthy();
		});

		test('returns false if value is present', () => {
			const value = Some(0);

			const isEmpty = empty(value);

			expect(isEmpty).toBeFalsy();
		});
	});
});

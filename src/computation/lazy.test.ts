import { describe, expect, jest, test } from '@jest/globals';
import { AsyncLazy, compute, computed, Lazy } from './lazy';

describe('lazy', () => {
	describe('computed', () => {
		test('returns true if the value has already been computed', () => {
			const value = 0;

			const check = computed(value);

			expect(check).toBeTruthy();
		});

		test('returns false if the value has not yet been computed', () => {
			const value = Lazy(() => 0);

			const check = computed(value);

			expect(check).toBeFalsy();
		});
	});

	describe('compute', () => {
		test('computes value only once', () => {
			const value = Lazy(jest.fn(() => 0));

			compute(compute(value));

			expect(value).toBeCalledTimes(1);
		});

		test('computes value only once (also for lazy async)', async () => {
			const value = AsyncLazy(jest.fn(async () => 0));

			compute(await compute(value));

			expect(value).toBeCalledTimes(1);
		});
	});
});

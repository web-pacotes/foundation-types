import { describe, expect, test } from '@jest/globals';
import { fold, isLeft, isRight, Left, Right } from './either';

describe('either', () => {
	describe('isLeft', () => {
		test('returns true if monad is left-handed', () => {
			const value = Left(0);

			const check = isLeft(value);

			expect(check).toBeTruthy();
		});

		test('returns false if monad is right-handed', () => {
			const value = Right(0);

			const check = isLeft(value);

			expect(check).toBeFalsy();
		});
	});

	describe('isRight', () => {
		test('returns true if monad is right-handed', () => {
			const value = Right(0);

			const check = isRight(value);

			expect(check).toBeTruthy();
		});

		test('returns false if monad is left-handed', () => {
			const value = Left(0);

			const check = isRight(value);

			expect(check).toBeFalsy();
		});
	});

	describe('fold', () => {
		test('computes left callback if monad is left-handed', () => {
			const value = 0;
			const monad = Left(value);

			const result = fold(
				monad,
				(l) => l + 1,
				(r) => r - 1
			);

			expect(result).toBe(value + 1);
		});

		test('computes right callback if monad is right-handed', () => {
			const value = 0;
			const monad = Right(value);

			const result = fold(
				monad,
				(l) => l + 1,
				(r) => r - 1
			);

			expect(result).toBe(value - 1);
		});
	});
});

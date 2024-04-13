import { describe, expect, test } from '@jest/globals';
import { fold, isLeft, isRight, Left, Right } from './either';

describe('either', function() {
	describe('isLeft', function() {
		test('returns true if monad is left-handed', function() {
			const value = Left(0);

			const check = isLeft(value);

			expect(check).toBeTruthy();
		});

		test('returns false if monad is right-handed', function() {
			const value = Right(0);

			const check = isLeft(value);

			expect(check).toBeFalsy();
		});
	});

	describe('isRight', function() {
		test('returns true if monad is right-handed', function() {
			const value = Right(0);

			const check = isRight(value);

			expect(check).toBeTruthy();
		});

		test('returns false if monad is left-handed', function() {
			const value = Left(0);

			const check = isRight(value);

			expect(check).toBeFalsy();
		});
	});

	describe('fold', function() {
		test('computes left callback if monad is left-handed', function() {
			const value = 0;
			const monad = Left(value);

			const result = fold(
				monad,
				(l) => l + 1,
				(r) => r - 1
			);

			expect(result).toBe(value + 1);
		});

		test('computes right callback if monad is right-handed', function() {
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
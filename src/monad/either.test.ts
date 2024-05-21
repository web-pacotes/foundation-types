import { describe, expect, test } from '@jest/globals';
import {
	Either,
	fold,
	isLeft,
	isRight,
	Left,
	leftMap,
	Right,
	rightMap
} from './either';

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
				(r) => r as number
			);

			expect(result).toBe(value + 1);
		});

		test('computes right callback if monad is right-handed', () => {
			const value = 0;
			const monad = Right(value);

			const result = fold(
				monad,
				(l) => l as number,
				(r) => r - 1
			);

			expect(result).toBe(value - 1);
		});
	});

	describe('leftMap', () => {
		test('computes left callback if monad is left-handed', () => {
			const value = 0;
			const monad = Left(value);

			const result = leftMap(monad, (l) => l + 1);

			expect(result).toStrictEqual(Left(value + 1));
		});

		test('does not compute left callback if monad is right-handed', () => {
			const value = 0;
			const monad = Right(value) satisfies Either<number, number>;

			const result = leftMap(monad, (l) => l + 1);

			expect(result).toStrictEqual(Right(value));
		});
	});

	describe('rightMap', () => {
		test('computes right callback if monad is right-handed', () => {
			const value = 0;
			const monad = Right(value);

			const result = rightMap(monad, (r) => r + 1);

			expect(result).toStrictEqual(Right(value + 1));
		});

		test('does not compute right callback if monad is left-handed', () => {
			const value = 0;
			const monad = Left(value) satisfies Either<number, number>;

			const result = rightMap(monad, (l) => l + 1);

			expect(result).toStrictEqual(Left(value));
		});
	});
});

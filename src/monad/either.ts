/**
 * Types the left side of an [Either] monad, typically used to describe failures.
 */
type Left<L> = {
	readonly tag: 'left';
	readonly left: L;
};

/**
 * Types the right side of an [Either] monad, typically used to describe success results.
 */
type Right<R> = {
	readonly tag: 'right';
	readonly right: R;
};

/**
 * Types an Either monad. As per convention, the [L] type represents a failure, while [R] the success type.
 */
export type Either<L, R> = Left<L> | Right<R>;

/**
 * Creates the left hand of an [Either].
 *
 * @param value - the value that represents the left hand
 */
export const Left = <L, R>(value: L): Either<L, R> => {
	return {
		tag: 'left',
		left: value
	} satisfies Left<L> & Either<L, R>;
};

/**
 * Creates the right hand of an [Either].
 *
 * @param value - the value that represents the right hand
 */
export const Right = <L, R>(value: R): Either<L, R> => {
	return {
		tag: 'right',
		right: value
	} satisfies Right<R> & Either<L, R>;
};

/**
 * Type-guard predicate that checks if an [Either] is left-handed.
 *
 * @param value - the [Either] monad to check.
 */
export const isLeft = <L, R>(value: Either<L, R>): value is Left<L> =>
	value.tag === 'left';

/**
 * Type-guard predicate that checks if an [Either] is right-handed.
 *
 * @param value - the [Either] monad to check.
 */
export const isRight = <L, R>(value: Either<L, R>): value is Right<R> =>
	value.tag === 'right';

/**
 * Folds an [Either] monad by computing the left callback, if the monad is left-handed or the right callback if a right-handed.
 *
 * @param value - the monad value to fold
 * @param left - callback for folding the left-hand
 * @param right - callback for folding the right-hnd
 * @returns the folded value based on the computed callbacks.
 */
export const fold = <L, R, F>(
	value: Either<L, R>,
	left: (l: L) => F,
	right: (r: R) => F
) => {
	switch (value.tag) {
		case 'left':
			return left(value.left);
		case 'right':
			return right(value.right);
	}
};

/**
 * Transforms an [Either] monad by mapping the left hand to a new value, if left-handed.
 *
 * @param value - the monad value to fold
 * @param left - callback for mapping the left-hand
 * @returns - an [Either] monad in which the left callback is applied to the left hand.
 */
export const leftMap = <L1, L2, R>(value: Either<L1, R>, left: (l: L1) => L2) =>
	(isLeft(value) ? Left(left(value.left)) : value) satisfies Either<L2, R>;

/**
 * Transforms an [Either] monad by mapping the right hand to a new value, if right-handed.
 *
 * @param value - the monad value to fold
 * @param left - callback for mapping the right-hand
 * @returns - an [Either] monad in which the right callback is applied to the right hand.
 */
export const rightMap = <L, R1, R2>(
	value: Either<L, R1>,
	right: (r: R1) => R2
) =>
	(isRight(value) ? Right(right(value.right)) : value) satisfies Either<L, R2>;

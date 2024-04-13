/**
 * Types the left side of an [Either] monad, typically used to describe failures.
 */
type Left<L> = {
	readonly tag: 'left';
	readonly value: L;
};

/**
 * Types the right side of an [Either] monad, typically used to describe success results.
 */
type Right<R> = {
	readonly tag: 'right';
	readonly value: R;
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
export const Left = <L, R>(value: L) => {
	return {
		tag: 'left',
		value: value
	} satisfies Left<L> & Either<L, R>;
};

/**
 * Creates the right hand of an [Either].
 *
 * @param value - the value that represents the right hand
 */
export const Right = <L, R>(value: R) => {
	return {
		tag: 'right',
		value: value
	} satisfies Right<R> & Either<L, R>;
};

/**
 * Type-guard predicate that checks if an [Either] is left-handed.
 *
 * @param value - the [Either] monad to check.
 */
export const isLeft = <L, R>(value: Either<L, R>): value is Left<L> => value.tag === 'left';

/**
 * Type-guard predicate that checks if an [Either] is right-handed.
 *
 * @param value - the [Either] monad to check.
 */
export const isRight = <L, R>(value: Either<L, R>): value is Right<R> => value.tag === 'right';

/**
 * Folds an [Either] monad by computing the left callback, if the monad is left-handed or the right callback if a right-handed.
 *
 * @param value - the monad value to fold
 * @param left - callback for folding the left-hand
 * @param right - callback for folding the right-hnd
 * @returns the folded value based on the computed callbacks.
 */
export const fold = <FL, FR, L, R>(
	value: Either<L, R>,
	left: (l: L) => FL,
	right: (r: R) => FR
) => {
	switch (value.tag) {
		case 'left':
			return left(value.value);
		case 'right':
			return right(value.value);
	}
};
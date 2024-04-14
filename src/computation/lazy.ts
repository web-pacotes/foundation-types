/**
 * Types a callback that computes a value.
 */
type LazyValueCallback<T> = () => T;

/**
 * Types a value that either needs to be computed or has been computed already.
 */
export type Lazy<T> = T | LazyValueCallback<T>;

/**
 * Creates a [Lazy] based on a synchronous callback.
 *
 * @param callback - the callback that computes a value.
 */
export const Lazy = <T>(callback: LazyValueCallback<T>): Lazy<T> =>
	callback satisfies Lazy<T>;

/**
 * Creates a [Lazy] based on an asynchronous callback.
 *
 * @param callback - the callback that computes a value.
 */
export const AsyncLazy = <T>(callback: LazyValueCallback<Promise<T>>) =>
	callback;

/**
 * Type-guard predicate that checks if a [Lazy] has been computed already.
 *
 * @param value - the [Lazy] value to check.
 */
export const computed = <T>(value: Lazy<T>): value is T =>
	typeof value !== 'function';

/**
 * Computes a [Lazy] value if it hasn't been already.
 *
 * @param value - the computed value.
 */
export const compute = <T>(value: Lazy<T>) =>
	computed(value) ? value : (value() satisfies Lazy<T>);

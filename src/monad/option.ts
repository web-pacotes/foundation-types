/**
 * Types an optional type at TypeScript check level.
 */
export type Option<T> = T | undefined;

/**
 * Creates an [Option] that contains a value.
 *
 * @param value - the contained value
 */
export const Some = <T>(value: T) => value satisfies Option<T>;

/**
 * Creates an empty [Option].
 */
export const None = <T>() => undefined satisfies Option<T>;

/**
 * Type-guard predicate that checks if an [Option] contains a value.
 *
 * @param value - the [Option] value to check.
 */
export const present = <T>(value: Option<T>): value is ReturnType<typeof Some<T>> => value !== undefined;

/**
 * Type-guard predicate that checks if an [Option] does not contain a value.
 *
 * @param value - the [Option] value to check.
 */
export const empty = <T>(value: Option<T>): value is ReturnType<typeof None<T>> => value === undefined;
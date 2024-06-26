# @web-pacotes/foundation-types

## 0.0.5

### Patch Changes

- 686b650: - feat(monad): implement leftMap and leftRight
  - refactor(monad): mark Left and Right output as Either<L, R>

## 0.0.4

### Patch Changes

- d464490: feat(error): implement runCatching and runAsyncCatching functions

## 0.0.3

### Patch Changes

- 98348f1: chore: fix package not bundling as module

## 0.0.2

### Patch Changes

- 657c386: Added the following types:

  - Error type (type safe errors)
    - IO (Read/Write) error type
    - Unknown error type
    - Wrapping/Unwrapping typed error in internal errors
    - Wrapper around try/catch to execute callbacks in a safe throwable environment

## 0.0.1

### Patch Changes

- 05914cf: Added the following types:

  - Option (either a value is present or absent)
  - Either (either a value or other value)
  - Lazy type (lazily computed value)

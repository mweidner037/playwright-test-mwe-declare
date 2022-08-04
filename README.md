# TypeScript declare in Playwright Test MWE

Goal: Declare the TypeScript type of a class's field without defining the field in JS. The JS define overwrites any field set in `super()` with `undefined`, breaking libraries like [Sequelize](https://sequelize.org/docs/v6/core-concepts/model-basics/#caveat-with-public-class-fields)).

See [TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/classes.html#type-only-field-declarations).

## Commands

- `npm run declare_fields`
  - Runs the Playwright test in `tests/declare_fields.test.ts`
  - Expected result: works
  - Actual result:

```
Error: /Users/matthew/repos/playwright-test-mwes/tests/declare_fields.test.ts: TypeScript 'declare' fields must first be transformed by @babel/plugin-transform-typescript.
If you have already enabled that plugin (or '@babel/preset-typescript'), make sure that it runs before any plugin related to additional class features:
 - @babel/plugin-proposal-class-properties
 - @babel/plugin-proposal-private-methods
 - @babel/plugin-proposal-decorators
  2 |
  3 | class TestClass {
> 4 |   public declare x: number;
    |   ^^^^^^^^^^^^^^^^^^^^^^^^^
  5 | }
  6 |
  7 | test('declare_fields', async ({ page }) => {
```

- `npm run unintended_define`
  - Runs the Playwright test in `tests/unintended_define.test.ts`
  - Expected result: test passes. (This is expected due to the `target` and `useDefineForClassFields` options in `tsconfig.json`.)
  - Actual result:

```
    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 7
    Received: undefined

      19 |   void page;
      20 |   const b = new B();
    > 21 |   expect(b.x).toBe(7);
         |               ^
      22 | });
      23 |
```

- `npm run ts-node`
  - Runs tests analogous to the above (in `tests/ts-node.ts`), but using `ts-node` instead of `playwright test`
  - Expected result: works, prints `success`
  - Actual result: same as expected
    - This is indeed tsconfig-dependent: if I change `target` to `es2022` and `useDefineForClassFields` to `true`, it errors like in `npm run unintended_define`.

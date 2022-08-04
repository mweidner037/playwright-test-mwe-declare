import { test, expect } from '@playwright/test';

class A {
  constructor() {
    // @ts-ignore This superclass doesn't properly declare x's type.
    this.x = 7;
  }
}

class B extends A {
  // We declare x's type properly on behalf of the subclass.
  // Prior to es2022, this is just a type annotation, but in
  // es2022, it overwrites the value set in A's constructor:
  // https://www.typescriptlang.org/docs/handbook/2/classes.html#type-only-field-declarations
  public x!: number;
}

test('unintended_define', async ({ page }) => {
  void page;
  const b = new B();
  expect(b.x).toBe(7);
});

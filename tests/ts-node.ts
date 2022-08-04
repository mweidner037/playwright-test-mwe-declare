// ts-node versions of tests

// ------------------
// declare_fields test
// ------------------

class TestClass {
  public declare x: number;
}

// ------------------
// unintended_define test
// ------------------

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

const b = new B();
if (b.x !== 7) throw new Error(`b.x is ${b.x}`);

console.log("success");
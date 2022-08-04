import { test } from '@playwright/test';

class TestClass {
  public declare x: number;
}

test('declare_fields', async ({ page }) => {
  void page;
  console.log('success');
});

import { test, expect } from '@playwright/test'

test('calculates a basic sum', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: '2' }).click()
    await page.locator('button').filter({ hasText: /^\+$/ }).click()
  await page.getByRole('button', { name: '3' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('.calculator-display')).toHaveText('5')
})

test('shows error when dividing by zero', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: '8' }).click()
  await page.locator('button').filter({ hasText: /^÷$/ }).click()
  await page.getByRole('button', { name: '0' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('.calculator-display')).toHaveText('Error')
})

test('clears calculator with CE', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: '9' }).click()
  await page.getByRole('button', { name: 'CE' }).click()

  await expect(page.locator('.calculator-display')).toHaveText('0')
})

test('stores and recalls calculator memory', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: '7' }).click()
  await page.getByRole('button', { name: 'M+' }).click()
  await page.getByRole('button', { name: 'CE' }).click()
  await page.getByRole('button', { name: 'MR' }).click()

  await expect(page.locator('.calculator-display')).toHaveText('7')
})
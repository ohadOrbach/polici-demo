import { test, expect } from '@playwright/test';

test('should allow a user to create and publish a new mission', async ({ page }) => {
  // 1. Navigate to the dashboard
  await page.goto('/dashboard');

  // 2. Click the "New Mission" link in the MissionGrid component
  await page.getByRole('link', { name: 'New Mission' }).click();

  // 3. Verify navigation to the mission creation page
  await expect(page).toHaveURL('/missions');
  await expect(page.getByRole('heading', { name: 'Mission Checklist' })).toBeVisible();

  // 4. Fill in the mission details
  const missionTitle = `Test Mission ${Date.now()}`;
  await page.getByPlaceholder('Enter mission title').fill(missionTitle);
  await page.getByPlaceholder('Enter mission description').fill('This is a test description for the new mission.');
  await page.getByLabel('Vessel').selectOption({ label: 'MV Northern Star' });
  await page.getByLabel('Due date').fill('2025-12-31T23:59');

  // 5. Click the "Publish Mission" button
  await page.getByRole('button', { name: 'Publish Mission' }).click();

  // 6. Check that the URL is now the dashboard page
  await expect(page).toHaveURL('/dashboard');
  
  // 7. Check that the new mission's title is visible in the MissionGrid
  await expect(page.getByText(missionTitle)).toBeVisible();
});

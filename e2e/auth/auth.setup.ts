import { test as setup, expect } from '@playwright/test';
import { BASE_URL } from '../utils/constants';

setup('authenticate', async ({ page }) => {
    await page.goto(`${BASE_URL}/wp-login.php`);

    await expect(page.locator('#user_login')).toBeVisible();

    await page.fill('#user_login', 'admin');
    await page.fill('#user_pass', 'admin'); // তোমার আসল password দাও

    await page.click('#wp-submit');

    await page.waitForURL('**/wp-admin/**');

    await page.context().storageState({
        path: 'playwright/.auth/admin.json',
    });
});
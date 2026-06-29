import {test as base } from '@playwright/test';

export const test = base.extend({
    adminPage: async ({page}, use) => {

        await page.goto('/wp-login.php');

        await page.fill(
            '#user_login',
            'admin'
        );

        await page.fill(
            '#user_pass',
            'password'
        );

        await use(page);
    }
});
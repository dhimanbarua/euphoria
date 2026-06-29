import {test, expect} from '@playwright/test';
import { BASE_URL } from '../utils/constants';
test(
    'Settings persist after reload',
    async ({page}) => {

        await page.goto(`${BASE_URL}/wp-admin/admin.php?page=euphoria`);

        const toggle = page.getByRole('switch');

        await toggle.check();

        await page.getByRole('button', {
            name: /save/i
        }).click();

        await page.reload();

        await expect(
            toggle
        ).toBeChecked();
    }
)
import { test, expect } from '@playwright/test';

import { EuphoriaPage } from '../pages/EuphoriaPage';

test(

    'Loads Email Reminder page',

    async ({page})=>{

        const euphoria=new EuphoriaPage(page);

        await euphoria.open();

        await expect(

            page.getByRole('button', { name: 'General ▾' })

        ).toBeVisible();

    }

);
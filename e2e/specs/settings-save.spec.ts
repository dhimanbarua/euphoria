import { test, expect } from '@playwright/test';

import { EuphoriaPage } from '../pages/EuphoriaPage';

test(

    'Save Settings',

    async ({page})=>{

        const euphoria=new EuphoriaPage(page);

        await euphoria.open();

        await euphoria.toggleReminder();

        const responsePromise=

            page.waitForResponse(

                res=>

                    res.url().includes(

                        '/euphoria/v1/settings'

                    )

                    &&

                    res.request().method()==='POST'

            );

        await euphoria.save();

        const response=await responsePromise;

        expect(response.ok()).toBeTruthy();

    }

);

test(

    'Settings persist',

    async({page})=>{

        const euphoria=new EuphoriaPage(page);

        await euphoria.open();

        await euphoria.toggleReminder();

        await euphoria.save();

        await page.reload();

        await expect(page.getByRole('switch')).toBeChecked();

    }

);

test(

    'Desktop Mobile Switch',

    async({page})=>{

        const euphoria=new EuphoriaPage(page);

        await euphoria.open();

        await page
            .getByTestId('mobile-preview-btn')
            .click();

        await expect(
            page.getByTestId(
                'email-preview'
            )
        ).toHaveAttribute(
            'data-mode',
            'mobile'
        );

        await page.getByTestId('desktop-preview-btn').click();

        await expect(
            page.getByTestId(
                'email-preview'
            )
        ).toHaveAttribute(
        'data-mode',
        'desktop'
        );

    }

);
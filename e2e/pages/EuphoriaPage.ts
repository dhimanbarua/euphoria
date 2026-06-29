import { expect } from '@playwright/test';
import { BASE_URL } from '../utils/constants';

export class EuphoriaPage{

    constructor(private page){}

    async open(){

        await this.page.goto(`${BASE_URL}/wp-admin/admin.php?page=euphoria`);

        await expect(

            this.page.getByLabel('Email Reminder')

        ).toBeVisible();

    }

    async toggleReminder(){

        await this.page.getByRole('switch').click();

    }

    async save(){

        await this.page.getByRole(

            'button',

            {name:/save settings/i}

        ).click();

    }

}
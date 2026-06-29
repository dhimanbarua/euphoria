import { BASE_URL } from '../utils/constants';

export class LoginPage {

    constructor(private page){}

    async login(username,password){
        await this.page.goto(`${BASE_URL}/wp-login.php`);

        await this.page.fill('#user_login', 'admin');

        await this.page.fill('#user_pass', 'admin'); // তোমার আসল password দাও;

        await this.page.click('#wp-submit');

    }

}
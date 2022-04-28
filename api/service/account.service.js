// Author: Alec Moldovan
// Description: Business Logic implementations
// the Service Layer is where all the business logic should go.
// (If the business logic requires fetching/saving data, it wires
// in a Repository)
// 
// UNIT TESTING:
// Can be tested as POJO (aka ) and by mocking Repository conditions we can test all business logic
const accountRepository  = require('../repository/account.repository');


class AccountService {

    constructor() {}

    async getAccounts() {
        return await accountRepository.getAccounts();
    }

    async createAccount(account) {
        return await accountRepository.createAccount(account);
    }

    async updateAccount(account) {
        return await accountRepository.updateAccount(account);
    }

    async deleteAccount(accountId) {
        return await accountRepository.deleteAccount(accountId);
    }

}
// TODO: Do I need Fans, Artist and Venue Controllers?

// **************
// INHERITANCE
// **************
// Venue Service
// Artist Service
// Fan Service

module.exports = new AccountService();



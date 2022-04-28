// Author: Alec Moldovan
// Description: Management of the REST interface to the business logic
// The Controller Layer is responsible for exposing the functionality
// so that it can be consumed by external entities (e.g. UI component)
//
// UNIT TESTING:
// Only worried about response codes and values
const accountService = require('../service/account.service');
const logger = require('../logger/api.logger.js');


class RegisterController{

    async getAccounts() {
        logger.info('Controller: getAccounts')
        return await taskService.getAccounts();
    }


    // Create Account
    async createAccount(account){
        logger.info('Controller: createAccount', account);
        return await accountService.createAccount(account)


    }
    
    async updateAccount(task) {
        logger.info('Controller: updateAccount', account);
        return await accountService.updateTask(account);
    }

    async deleteAccount(taskId) {
        logger.info('Controller: deleteAccount', accountId);
        return await accountService.deleteAccount(accountId);
    }


}

// TODO: Do I need Fans, Artist and Venue Controllers?

module.exports = new RegisterController();

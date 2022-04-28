// Author: Alec Moldovan
// Description: Storage of the entity beans in the system
// The Repository layer is responsible for storing and retrieving some set of data.
const { connect, disconnect } = require('../config/db.config');
const { Account } = require('../model/account.model');
const logger = require('../logger/api.logger');

class AccountRepository {

    constructor() {
        connect();
    }

    async getAccounts() {
        const accounts = await Account.find({});
        console.log('accounts:::', accounts);
        return accounts;
    }

    async createAccount(account) {
        let data = {};
        try {
            data = await Account.create(account);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateAccount(account) {
        let data = {};
        try {
            data = await Account.updateOne(account);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteAccount(accountId) {
        let data = {};
        try {
            data = await Account.deleteOne({_id : accountId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new AccountRepository();

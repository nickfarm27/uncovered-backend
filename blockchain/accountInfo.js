import { NetworkType, Address, AccountHttp, PublicAccount, Order } from 'tsjs-xpx-chain-sdk';

const API_URL = 'https://bctestnet3.brimstone.xpxsirius.io/';
const NETWORK_TYPE = NetworkType.TEST_NET;

const accountHttp = new AccountHttp(API_URL);

const getAccountInfoForAnAccount = () => {

    const address = Address.createFromRawAddress('VAX5ZG2HTXXOOOIHY72BARK5L66XF46BOQWENU5Q');

    return accountHttp.getAccountInfo(address).subscribe(accountInfo => {
        console.log(accountInfo.mosaics[0].id)
    }, error => {
        console.error(error);
    });
}
getAccountInfoForAnAccount()

const getAccountsInfoForDifferentAccounts = () => {
    const address1 = Address.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);
    const address2 = Address.createFromPublicKey('0EB448D07C7CCB312989AC27AA052738FF589E2F83973F909B506B450DC5C4E2', NETWORK_TYPE);

    return accountHttp.getAccountsInfo([address1, address2]).subscribe(accountInfo => {
        console.log(accountInfo);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getConfirmedIncomingTransactions = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.incomingTransactions(publicAccount).subscribe(tx => {
        console.log(tx);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getConfirmedOutgoingTransactions = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.outgoingTransactions(publicAccount).subscribe(tx => {
        console.log(tx);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getConfirmedAllTransactions = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.transactions(publicAccount, {
        pageSize: 20,
        order: Order.ASC
    }).subscribe(tx => {
        console.log(tx);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getUnconfirmedTransactions = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.unconfirmedTransactions(publicAccount).subscribe(tx => {
        console.log(tx);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getAggregateBondedTransactions = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.aggregateBondedTransactions(publicAccount).subscribe(tx => {
        console.log(tx);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getMultisigAccountInfo = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.getMultisigAccountInfo(publicAccount.address).subscribe(info => {
        console.log(info);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

const getMultisigAccountGraphInfo = () => {
    const publicAccount = PublicAccount.createFromPublicKey('73472A2E9DCEA5C2A36EB7F6A34A634010391EC89E883D67360DB16F28B9443C', NETWORK_TYPE);

    return accountHttp.getMultisigAccountGraphInfo(publicAccount.address).subscribe(info => {
        console.log(info);
    }, error => {
        console.error(error);
    }, () => {
        console.log('done.');
    });
}

// getAccountInfoForAnAccount();
// getAccountsInfoForDifferentAccounts();
// getConfirmedIncomingTransactions();
// getConfirmedOutgoingTransactions();
// getConfirmedAllTransactions();
// getUnconfirmedTransactions();
// getAggregateBondedTransactions();
// getMultisigAccountInfo();
// getMultisigAccountGraphInfo();
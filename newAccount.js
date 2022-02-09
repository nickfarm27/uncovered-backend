import {Account, NetworkType} from 'tsjs-xpx-chain-sdk';

const NETWORK_TYPE = NetworkType.TEST_NET;

export const generateNewAccount = () => {
    const newAccount = Account.generateNewAccount(NETWORK_TYPE);

    console.log('address:     ' + newAccount.address.plain());
    console.log('public key:  ' + newAccount.publicKey);
    console.log('private key: ' + newAccount.privateKey);

    return newAccount;
};

// generateNewAccount();
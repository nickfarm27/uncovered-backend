import {Account, NetworkType} from 'tsjs-xpx-chain-sdk';

const NETWORK_TYPE = NetworkType.TEST_NET;

export const generateNewAccount = () => {
    const newAccount = Account.generateNewAccount(NETWORK_TYPE);

    console.log('address:     ' + newAccount.address.plain());
    console.log('public key:  ' + newAccount.publicKey);
    console.log('private key: ' + newAccount.privateKey);

    return newAccount.privateKey;
};

const generateAddressFromPublicKey = () => {
    const publicKey = 'E05B9C0F9BABB57635F8786ACE7DF9392F792ADE259F4709FE5E62DF85CFA4E9';

    const addressFromPublicKey = Address.createFromPublicKey(publicKey, NETWORK_TYPE);
    console.log(addressFromPublicKey);
};

const generateAddressFromPrivateKey = () => {
    const privateKey = '6CC71F8B5A1B6A6A614497F22D066D8457AB4434CB0F3B6452AA555E49048E8A';
    console.log(privateKey);

    const accountFromPrivateKey = Account.createFromPrivateKey(privateKey, NETWORK_TYPE);
    console.log(accountFromPrivateKey.address);
}
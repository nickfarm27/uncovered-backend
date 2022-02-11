import {
    Account,
    NetworkType,
    Password,
    SimpleWallet,
} from "tsjs-xpx-chain-sdk";

export const generateKeys = () => {
    const account = Account.generateNewAccount(NetworkType.TEST_NET);

    const password = new Password("password");
    // Replace with a private key
    const privateKey = account.privateKey;
    const wallet = SimpleWallet.createFromPrivateKey(
        "test-wallet",
        password,
        privateKey,
        NetworkType.TEST_NET
    );
    const walletAccount = wallet.open(password);

    console.log(
        "Your account address is:",
        walletAccount.address.pretty(),
        "and its private key",
        walletAccount.privateKey
    );

    return {
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        address: account.address.pretty(),
    };
};

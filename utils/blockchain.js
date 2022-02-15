import {
    Account,
    Deadline,
    NetworkCurrencyMosaic,
    NetworkType,
    Password,
    PlainMessage,
    PublicAccount,
    SimpleWallet,
    TransactionHttp,
    TransferTransaction,
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

export const transferCoins = (recipientPublicKey, transferAmount) => {
    //? Uncovered's private key
    const sender = Account.createFromPrivateKey(
        "795C61F2C5DCAD347F3B42FA1185B32162D8064B3FDBCEB2D081FD813516F9EC",
        // test2 'CE70B1BF3667249C877E6D2C64250D17AEBD8FE7D5CC0C5F29CEF9580474DBB9',
        NetworkType.TEST_NET
    );

    const recipient = PublicAccount.createFromPublicKey(
        recipientPublicKey,
        NetworkType.TEST_NET
    );

    const tx = TransferTransaction.create(
        Deadline.create(),
        recipient.address,
        [NetworkCurrencyMosaic.createRelative(transferAmount)],
        PlainMessage.create("Uncovered Payout"),
        NetworkType.TEST_NET
    );

    const signedTransaction = sender.sign(
        tx,
        "56D112C98F7A7E34D1AEDC4BD01BC06CA2276DD546A93E36690B785E82439CA9"
    );

    const transactionHttp = new TransactionHttp(
        "http://bctestnet3.brimstone.xpxsirius.io:3000"
    );

    transactionHttp.announce(signedTransaction).subscribe(
        (x) => console.log(x),
        (err) => console.log(err)
    );
};

export const uploadDataToBlockchain = (data) => {
    //? Uncovered's private key
    const sender = Account.createFromPrivateKey(
        "795C61F2C5DCAD347F3B42FA1185B32162D8064B3FDBCEB2D081FD813516F9EC",
        // test2 'CE70B1BF3667249C877E6D2C64250D17AEBD8FE7D5CC0C5F29CEF9580474DBB9',
        NetworkType.TEST_NET
    );

    const recipient = sender.publicAccount;

    const tx = TransferTransaction.create(
        Deadline.create(),
        recipient.address,
        [],
        PlainMessage.create(JSON.stringify(data)),
        NetworkType.TEST_NET
    );

    const signedTransaction = sender.sign(
        tx,
        "56D112C98F7A7E34D1AEDC4BD01BC06CA2276DD546A93E36690B785E82439CA9"
    );

    const transactionHttp = new TransactionHttp(
        "http://bctestnet3.brimstone.xpxsirius.io:3000"
    );

    transactionHttp.announce(signedTransaction).subscribe(
        (x) => console.log(x),
        (err) => console.log(err)
    );
};
import {
    Account,
    AccountHttp,
    Address,
    BlockHttp,
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

export const generateKeys = (req, res) => {
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

    res.json({
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        address: account.address.pretty(),
    });
};

// VAX5ZG-2HTXXO-OOIHY7-2BARK5-L66XF4-6BOQWE-NU5Q
export const getAccountInfo = (req, res) => {
    const addressString = req.body.address;
    const API_URL = "https://bctestnet3.brimstone.xpxsirius.io/";
    const accountHttp = new AccountHttp(API_URL);
    const address = Address.createFromRawAddress(addressString);

    accountHttp.getAccountInfo(address).subscribe(
        (accountInfo) => {
            const address = accountInfo.address.pretty();
            const addressHeight = accountInfo.addressHeight.compact();
            // const xpxMosaicId = accountInfo.mosaics[0].id.id.compact()
            const xpxAmount = accountInfo.mosaics[0].amount.compact();

            res.json({
                address: address,
                addressHeight: addressHeight,
                // xpxMosaicId: xpxMosaicId,
                xpxAmount: xpxAmount,
            });
        },
        (error) => {
            res.json(error);
        }
    );
};

export const getAllTransactions = (req, res) => {
    // TODO change this to public key
    const publicKey = req.body.publicKey;
    const accountHttp = new AccountHttp(
        "http://bctestnet3.brimstone.xpxsirius.io:3000"
    );
    // const publicKey = 'EF395EF11C15AED81E06D07CF673F6098947895386879EEA59DD64F6755EF43B';
    const publicAccount = PublicAccount.createFromPublicKey(
        publicKey,
        NetworkType.TEST_NET
    );

    accountHttp.transactions(publicAccount).subscribe(
        (tx) => {
            let transactionList = [];
            tx.forEach((t) => {
                const transactionInfo = {
                    signature: t.signature,
                    signer: {
                        publicKey: t.signer.publicKey,
                        address: t.signer.address,
                    },
                    blockInfo: {
                        height: t.transactionInfo.height.compact(),
                        id: t.transactionInfo.id,
                        hash: t.transactionInfo.hash,
                        merkleComponentHash:
                            t.transactionInfo.merkleComponentHash,
                    },
                    recipient: {
                        address: t.recipient,
                    },
                    amount: t.mosaics[0] ? t.mosaics[0].amount.compact() : null,
                    message: t.message.payload,
                    direction:
                        publicAccount.address.plain() === t.recipient.address
                            ? "IN"
                            : "OUT",
                };
                transactionList.push({ transferTransaction: transactionInfo });
            });
            res.json({ transactions: transactionList });
        },
        (error) => {
            res.json({ error: error });
        }
    );
};

// TODO: transfer transaction (transfer coins to users)
export const transferCoins = (req, res) => {
    const recipientPublicKey = req.body.publicKey;
    const transferAmount = Number(req.body.transferAmount);

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
        (x) => res.json(x),
        (err) => res.json(err)
    );
};

// TODO: transfer transaction (upload data to blockchain as json stringified value)
export const uploadDataToBlockchain = (req, res) => {
    const message = req.body.message;

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
        PlainMessage.create(message),
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
        (x) => res.json(x),
        (err) => res.json(err)
    );
};

// TODO: get block transaction info
export const getBlockTransactionInfo = (req, res) => {
    const height = Number(req.body.height);
    const blockHttp = new BlockHttp(
        "http://bctestnet3.brimstone.xpxsirius.io:3000"
    );

    blockHttp.getBlockTransactions(height).subscribe(
        (t) => {
            const transactionInfo = {
                signature: t[0].signature,
                signer: {
                    publicKey: t[0].signer.publicKey,
                    address: t[0].signer.address,
                },
                blockInfo: {
                    height: t[0].transactionInfo.height.compact(),
                    id: t[0].transactionInfo.id,
                    hash: t[0].transactionInfo.hash,
                    merkleComponentHash:
                        t[0].transactionInfo.merkleComponentHash,
                },
                recipient: {
                    address: t[0].recipient,
                },
                amount: t[0].mosaics[0]
                    ? t[0].mosaics[0].amount.compact()
                    : null,
                message: t[0].message.payload,
            };
            res.json(transactionInfo);
        },
        (error) => {
            res.json(error);
        }
    );
};

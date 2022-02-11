import { TransferTransaction, Deadline, Account, NetworkType, PlainMessage, NetworkCurrencyMosaic, TransactionHttp, PublicAccount } from 'tsjs-xpx-chain-sdk';

const sender = Account.createFromPrivateKey(
    // '795C61F2C5DCAD347F3B42FA1185B32162D8064B3FDBCEB2D081FD813516F9EC',
    'CE70B1BF3667249C877E6D2C64250D17AEBD8FE7D5CC0C5F29CEF9580474DBB9',
    NetworkType.TEST_NET);

const recipient = Account.createFromPrivateKey(
    // '795C61F2C5DCAD347F3B42FA1185B32162D8064B3FDBCEB2D081FD813516F9EC',
    'B1A70594B121B7D0E08680E701C8DF66593666EE4AA3D003056E8103ACCB9094',
NetworkType.TEST_NET).publicAccount;

const tx = TransferTransaction.create(
    Deadline.create(),
    recipient.address,
    [NetworkCurrencyMosaic.createRelative(1)],
    PlainMessage.create('Send to myself can?'),
    NetworkType.TEST_NET
);

const signedTransaction = sender.sign(tx, "56D112C98F7A7E34D1AEDC4BD01BC06CA2276DD546A93E36690B785E82439CA9");

const transactionHttp = new TransactionHttp('http://bctestnet3.brimstone.xpxsirius.io:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
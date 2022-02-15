import { TransferTransaction, Deadline, Account, NetworkType, PlainMessage, NetworkCurrencyMosaic, TransactionHttp, PublicAccount } from 'tsjs-xpx-chain-sdk';

const sender = Account.createFromPrivateKey(
    // '795C61F2C5DCAD347F3B42FA1185B32162D8064B3FDBCEB2D081FD813516F9EC',
    'CE70B1BF3667249C877E6D2C64250D17AEBD8FE7D5CC0C5F29CEF9580474DBB9',
    NetworkType.TEST_NET);

const recipient = Account.createFromPrivateKey(
    // '795C61F2C5DCAD347F3B42FA1185B32162D8064B3FDBCEB2D081FD813516F9EC',
    '0B42CBFBADF4A7100FFA2CD476FC4222FDF0A805A0F54F0469DCD33293486F34',
NetworkType.TEST_NET).publicAccount;

const tx = TransferTransaction.create(
    Deadline.create(),
    recipient.address,
    [NetworkCurrencyMosaic.createRelative(6969)],
    PlainMessage.create('69696969 420 YAAAAAAAAA'),
    NetworkType.TEST_NET
);

const signedTransaction = sender.sign(tx, "56D112C98F7A7E34D1AEDC4BD01BC06CA2276DD546A93E36690B785E82439CA9");

const transactionHttp = new TransactionHttp('http://bctestnet3.brimstone.xpxsirius.io:3000');

transactionHttp
    .announce(signedTransaction)
    .subscribe(x => console.log(x), err => console.error(err));
import { BlockHttp } from "tsjs-xpx-chain-sdk";

const blockHttp = new BlockHttp('http://bctestnet3.brimstone.xpxsirius.io:3000');

const height = 4545298;

// blockHttp
//     .getBlockByHeight(height)
//     .subscribe(block => console.log(block), err => console.error(err));

const getTransactionsFromAblock = () => {
    blockHttp.getBlockTransactions(height).subscribe(transactions => {
        transactions.forEach(tx => {
            console.log(tx);
        });
    }, error => {
        console.error(error);
    }, () => {
        console.log("done.");
    })
}

getTransactionsFromAblock()
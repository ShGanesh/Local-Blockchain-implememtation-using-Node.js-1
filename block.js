const SHA256 = require('crypto-js/sha256')

// A Block of the blockchain in htis project contains an index, data, previous hash (00... for genesis), timestamp and nonce.  
class Block {
    constructor(data, prevHash = "") {
        this.index = 0;
        this.data = data;
        this.prevHash = prevHash;
        this.timeStamp = Date.now();
        this.nonce = -1
        // Calculates nonce for the Genesis Block. For others, it will calculate using genesis values. 
        // Can either be corrected using proper parameters in functions, or kept as it is,
        // as this will deliberately increase the 'work' needed to do "Proof of Work" 
        while (String(this.hash).substring(0, 2) != "00") {
            this.nonce = this.nonce + 1;
            this.hash = this.compHash();
        }
    }

    compHash () {
        let strB = this.nonce + this.index + this.prevHash + this.timeStamp + JSON.stringify(this.data) + "Kya karoge ise dekhke?"
        return SHA256(strB).toString();
    }
}

class BlockChain {
    constructor () {
        this.blockchain = [this.startGenesisBlock()];
        // An Array is created which contains one element: the Genesis Block,
    }

    startGenesisBlock () {
        return new Block("Genesis Block", "0000000000000000000000000000000000000000000000000000000000000000");
        // PrevHash for a Genesis Block doesn't exist (It's called genesis for a reason.)
    }

    getLatestBlock () {
        //console.log(this.blockchain)
        return this.blockchain[this.blockchain.length - 1];
        // Returns latest element in the Blockchain Array.
    }

    addNewBlock(newBlock) {
        newBlock.index = this.getLatestBlock().index + 1;
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.compHash(); // Resetting hash as the nonce will also be calculated with genesis values.
        newBlock.nonce = -1
        // Computes Nonce for newBlock which now has updated information (index, prevhash).
        while (String(newBlock.hash).substring(0, 2) != "00") {
            newBlock.nonce = newBlock.nonce + 1;
            newBlock.hash = newBlock.compHash();
        }
        this.blockchain.push(newBlock);
    }

    checkChainValidity() { 
        for(let i = 1; i < this.blockchain.length; i++) { 
            const currBlock = this.blockchain[i]
            const prevBlock = this.blockchain[i -1]
            
            if(currBlock.hash !== currBlock.compHash()) { 
                return false
            }
            if(currBlock.prevHash !== prevBlock.hash) {                 
                return false
            }
        }
        return true
    }
}

function addBlock (info) {
    diary.addNewBlock(new Block(info));
}

module.exports = {
    Block : Block,
    BlockChain : BlockChain
}

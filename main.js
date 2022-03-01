var bloc = require('./block');
// file block.js should be situated in the same directory as this one.

let diary = new bloc.BlockChain(); // Creating a new instance of class Blockchain

function addBlocks (info) {
    diary.addNewBlock(new bloc.Block(info))
}

// This Array and the function above were made for my own convenience.
var dataList = [`The very first implementation of Blockchain by ShGanesh. 
This one is specifically supposed to be Block 1 (after genesis block). 
Have a nice day.`,
`L***i call utha liya kar... Kataii Irritating.`, 
`The day pigeons fall apart is the day they get overcooked due to being 
in the perfect radius of a nuclear explosion.`,
`While people wondered where all the Crumple-Horned Snorkacks went, 
our protagonist was leisurely humping the back of a humpback whale 
while sipping some sauce handmade from leftover tomatoes after La Tomatina '21.`
]

dataList.forEach(addBlocks);

console.log("Diary");
console.log(diary.blockchain);
console.log("Validity: "+ diary.checkChainValidity())

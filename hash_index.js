'use strict';
// var Reader = require('./Reader.js');
// var reader = new Reader();

// var file = './data6_17.json';

// reader.createDb();
// reader.readLine(file);

var BST = require('./BST');
var bst = new BST();


var test = [3, 4, 1, 5, 7];
for(var i = 0; i < test.length; ++i){
	bst.insert(test[i]);
}

console.log(bst.contains(1));
console.log(bst.contains(2));
console.log(bst.contains(9));

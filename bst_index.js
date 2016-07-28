var  BST = require('./BST');
var bst = new BST();



var test = [5, 3, 7, 1, 4, 6, 9];
// var test = [10, 20, 30, 5, 8, 3, 9];

test.map(function(value, i){
	bst.insert(value);
});

var preorder = bst.DFSpreOrder(); 
console.log('preorder', preorder);

var inorder = bst.DFSinOrder();
console.log('inorder', inorder);

var postorder = bst.DFSpostOrder();
console.log('postorder', postorder);

var bfs_ltr = bst.BFS_LtR();
console.log('bfs [left-to-right]', bfs_ltr);

var bfs_rtl = bst.BFS_RtL();
console.log('bfs [right-to-left]', bfs_rtl);

var min = bst.findMin();
console.log('min: ', min);
var max = bst.findMax();
console.log('max: ', max);

var depth = bst.getDepth();
console.log('depth: ', depth);

var leaves = bst.countLeaves();
console.log('leaves', leaves);

var depth = bst.getByDepth();
console.log('depth', depth);

var average = bst.nodeAverage();
console.log('average', average);

var linkedListTrees = bst.convert2LinkedList();
console.log(linkedListTrees);

var search1 = bst.search(4);
console.log('search1: ', search1);

var search2 = bst.search(3);
console.log('search2: ', search2);
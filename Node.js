var Node = function(value){
	this.value = value;
	this.left = null;
	this.right = null;
	return this;
};
var ListNode = function(value){
	this.value = value;
	this.next = null;
	return this;
};
// module.exports = Node;
exports.TreeNode = Node;
exports.ListNode = ListNode;
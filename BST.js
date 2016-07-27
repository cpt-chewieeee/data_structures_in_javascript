var Node = require('./Node');
var BST = function(){
	this.root = null;
	return this;
};

BST.prototype.insert = function(value){
	var current_node = new Node(value);
	if(!this.root){
		this.root = current_node;
		return;
	}
	var recursion = function(node){
		if(value > node.value){
			if(!node.right){
				node.right = current_node;
				return; 
			} else {
				recursion(node.right);
			}
		} else if(value < node.value){
			if(!node.left){
				node.left = current_node;
				return;
			} else {
				recursion(node.left);
			}
		}
	};
	recursion(this.root);
};
BST.prototype.contains = function(value){
	var node = this.root;
	var traverse = function(node){
		if(!node) return false;
		if(value === node.value){
			return true;
		} else if(value > node.value){
			return traverse(node.right);
		} else if(value < node.value){
			return traverse(node.left);
		}
	};
	return traverse(node);
};
module.exports = BST;
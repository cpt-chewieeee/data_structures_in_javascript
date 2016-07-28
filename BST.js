'use strict'
var Node = require('./Node').TreeNode;
var ListNode = require('./Node').ListNode;
var LinkedList = require('./LinkedList');
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

/* goes deeper before exploring siblings. returns the shallowest descandants first */
/*	DFS	*/
BST.prototype.DFSpreOrder = function(){
	var result = [];
	var root = this.root;

	var recursion = function(node){

		result.push(node.value);
		if(node.left) recursion(node.left);
		if(node.right) recursion(node.right);

	};
	recursion(root);
	return result;
};
BST.prototype.DFSinOrder = function(){
	var result = [];
	var recursion = function(node){
		if(node.left) recursion(node.left);
		result.push(node.value);
		if(node.right)	recursion(node.right);
	};
	recursion(this.root);
	return result;
};
BST.prototype.DFSpostOrder = function(){
	var result = [];
	var recursion = function(node){
		if(node.left) recursion(node.left);
		if(node.right) recursion(node.right);
		result.push(node.value);
	}
	recursion(this.root);
	return result;
};

/* finds all the siblings at each level in order from [left-to-right] or [right-to-left] */
/* BSF */
BST.prototype.BFS_LtR = function(){
	var root = this.root
	var queue = [root];
	var result = [];
	while(root = queue.shift()){
		result.push(root.value);
		if(root.left) queue.push(root.left);
		if(root.right) queue.push(root.right);
	}
	return result;
};
BST.prototype.BFS_RtL = function(){
	var root = this.root
	var queue = [root];
	var result = [];
	while(root = queue.shift()){
		result.push(root.value);
		if(root.right) queue.push(root.right);
		if(root.left) queue.push(root.left);
	}
	return result;
};

/* HELPER FUNCTIONS */
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
BST.prototype.findMin = function(){
	var root = this.root;
	var traverse = function(node){
		return !node.left ? node.value : traverse(node.left);
	};
	return traverse(root);
};

/* if the largest element were not the 'rightmost', then the largest element would either: */
/* 1. be in some ancestor node's left subtree */
/* 2. have a right child */

/* CONTRADICTION */
/* 1a. if the node is in some ancestor node's left subtree it's smaller than that ancestor node, so its not the largest */
/* 2a. if the node has a right child that child is largest than it, so its not the largest */
BST.prototype.findMax = function(){
	var recursion = function(node){
		return !node.right ? node.value : recursion(node.right);
	};
	return recursion(this.root);
};
BST.prototype.getDepth = function(){
	var max_depth = 0;
	var recursion = function(node, depth){
		if(!node) return null;

		if(max_depth < depth) max_depth = depth;
		recursion(node.left, depth+1);
		recursion(node.right, depth+1);
	}
	recursion(this.root, 0);
	return max_depth;
};
BST.prototype.countLeaves = function(){
	var count = 0;
	var root = this.root;
	var recursion = function(node){
		if(!node) return null;

		if(!node.left && !node.right) count++;
		else recursion(node.left) + recursion(node.right);
	};
	recursion(this.root);
	return count;
};
BST.prototype.getByDepth = function(){
	var root = this.root;
	var result = {};
	var recursion = function(node, depth){
		if(!node) return null;
		if(!result[depth]) result[depth] = [node.value];
		else result[depth].push(node.value);

		if(node.right || node.left){
			recursion(node.left, depth+1);
			recursion(node.right, depth+1);
		}
	};
	recursion(root, 0);
	return result;
};
BST.prototype.search = function(value){
	var root = this.root;
	
	while(root && value !== root.value){
		if(value < root.value) root = root.left;
		else root = root.right;
	}
	if(!root) return false;
	else return root.value;
};

/* RETURN AVERAGE OF THE NODES AT EACH DEPTH WITH BFS */
BST.prototype.nodeAverage = function(){
	var root = this.root;
	var result = this.getByDepth();
	var depthAverage = [];
	for(var key in result){
		var len = result[key].length;
		var depthAvg = 0;
		result[key].map(function(value, i){
			depthAvg += value;
		});
		var average = Number(depthAvg / len);
		depthAverage.push(average);
	}
	return depthAverage;
};


BST.prototype.convert2LinkedList = function(){
	var root = this.root;
	if(!root) return null;

	var inorderResult = this.DFSinOrder();
	var list = new LinkedList();

	list.head = new ListNode(inorderResult[0]);

	var current = list.head;
	for(var i = 1; i < inorderResult.length; i++){
		var currentNode = new ListNode(inorderResult[i]);
		current.next = currentNode;
		current = current.next;
	}
	return list;

};
module.exports = BST;
'use strict';

var Stack = function(){
	this.stack = [];
	return this;
};
Stack.prototype.push = function(){
	this.stack.push.apply(this.stack, arguments);
};
Stack.prototype.pop = function(){
	return this.stack.pop.apply(this.stack, arguments);
};
Stack.prototype.size = function(){
	return this.stack.length;
}
Stack.prototype.peek = function(){
	return this.stack;
};

module.exports = Stack;
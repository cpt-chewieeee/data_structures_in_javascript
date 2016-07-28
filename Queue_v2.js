var Stack = require('./Stack');

var Queue = function(){
	this.inbox = new Stack();
	this.outbox = new Stack();
};
Queue.prototype.enqueue = function(){
	this.inbox.push.apply(this.inbox, arguments);
};
Queue.prototype.dequeue = function(){
	if(this.outbox.size() === 0){
		while(this.inbox.size()){
			this.outbox.push(this.inbox.pop());
		}
	}
	return this.outbox.pop();
};
Queue.prototype.size = function(){
	return this.inbox.size() + this.outbox.size();
};
Queue.prototype.peek = function(){
	return this.outbox.peek();
};
module.exports = Queue;
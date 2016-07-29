var Queue = function(){
	this.i = 1;
	this.j = 1;
	this.storage = {};
	return this;	
};
Queue.prototype.size = function(){
	return this.j - this.i;
};
Queue.prototype.enqueue = function(data){
	this.storage[this.j] = data;
	this.j++;
};
Queue.prototype.dequeue = function(){
	var result = false;
	if(this.i !== this.j){
		result = this.storage[this.i];
		delete this.storage[this.i];
		this.i++;
	}
	return result;
};
Queue.prototype.peek = function(){
	return this.storage;
};

var q = new Queue();
console.log(q);
q.enqueue(1)
console.log(q.peek());
q.enqueue(4);
console.log(q.peek());
q.enqueue(8);
console.log(q.peek());
q.enqueue(12);
console.log(q.peek());
q.enqueue(14);
console.log(q.peek());
q.enqueue(15);
console.log(q.peek());
q.enqueue(19);
console.log(q.peek());

console.log('~~~~');
console.log(q.dequeue());
console.log(q.peek());

console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.peek());

console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.peek());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
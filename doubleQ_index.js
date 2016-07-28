'use strict';
var Queue = require('./Queue_v2');
var stdQueue = require('./Queue');
var queue = new Queue();

queue.enqueue(10, 20, 30, 50, 60, 90);
console.log(queue.peek());
queue.dequeue();
console.log(queue.peek());
queue.dequeue();
console.log(queue.peek());
queue.dequeue();
console.log(queue.peek());
queue.dequeue();
console.log('~~~~~~~~~~~~');


var std_queue = new stdQueue();

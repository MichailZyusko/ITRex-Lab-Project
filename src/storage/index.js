import Queue from '../api/queue/Queue.js';
import scheduler from '../scheduler/index.js';

const queue = new Queue();
scheduler(queue);

export default queue;

import Queue from '../api/repositories/services/queueServices.js';
import scheduler from '../scheduler/index.js';

const queue = new Queue();
scheduler(queue);

export default queue;

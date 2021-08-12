import deleteClient from './DELETE/delete.js';
import addClient from './POST/post.js';
import setDiagnose from './PATCH/patch.js';
import { getSearchingClient, getNextClient } from './GET/get.js';

export {
  deleteClient, getSearchingClient, getNextClient, addClient, setDiagnose,
};

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import queue from '../../storage/index.js';

export default async (refreshTime) => {
  try {
    // TODO Добавить булевский флаг, который будет ослеживать изменения и не дудусить лишний раз БД
    for (const [key, value] of queue.storage.resolutions.entries()) {
      const map = value.map((item) => {
        if (item.TTL !== null && item.TTL - refreshTime <= 0) {
          item.diagnose = null;
          item.TTL = null;
        } else {
          item.TTL -= refreshTime;
        }
        return item;
      });

      queue.storage.resolutions.set(key, map);
    }
  } catch (error) {
    console.log(error);
  }
};

/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

export default async (queue) => {
  try {
    const now = Date.parse(new Date());

    const resolutions = Array.from(queue.storage.resolutions.entries());
    resolutions.forEach(([key, value]) => {
      if (now - Date.parse(value.TTL) >= 0) {
        value.status = 'outdate';
        queue.storage.resolutions.set(key, value);
      }
    });
    // for (const [key, value] of queue.storage.resolutions.entries()) {
    //   if (now - Date.parse(value.TTL) >= 0) {
    //     value.status = 'outdate';
    //     queue.storage.resolutions.set(key, value);
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};

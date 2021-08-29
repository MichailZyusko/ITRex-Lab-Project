/* eslint-disable no-param-reassign */

export default async (queue) => {
  try {
    const now = Date.parse(new Date());

    const resolutions = await queue.getResolutions();
    resolutions.forEach(async ({ key, value }) => {
      if (now - Date.parse(value.TTL) >= 0) {
        value.status = 'outdate';
        await queue.storage.data.hmsetAsync(key, value);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

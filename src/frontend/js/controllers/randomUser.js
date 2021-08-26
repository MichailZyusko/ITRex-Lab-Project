import { addClient } from '../services/index.js';

const URL = 'https://randomuser.me/api/';

const parser = (obj) => {
  const {
    gender,
    name: {
      first: firstName,
      last: lastName,
    },
    location: {
      street: {
        number: streetNumber,
        name: streetName,
      },
      city,
      country,
    },
    email,
    dob: {
      age: fullAge,
    },
    phone: phoneNumber,
    picture: {
      large: picture,
    },
  } = obj;

  return {
    firstName,
    lastName,
    gender,
    fullAge,
    country,
    address: `${city}, ${streetName} street ${streetNumber}`,
    email,
    phoneNumber,
    picture,
  };
};

export default async (ws) => {
  const preresult = await fetch(URL);
  const result = await preresult.json();

  await addClient(ws, null, parser(...result.results));
};

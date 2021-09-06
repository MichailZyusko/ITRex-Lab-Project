import doctorsTable from '../../../../storage/database/tables/doctorsTable.js';

export default async (doctor) => {
  // doctor = {
  //   firstName: 'Richard',
  //   lastName: 'Karpovich',
  //   gender: 'Male',
  //   fullAge: 47,
  //   position: 'Paramedic',
  //   phoneNumber: '+375 (29) 888-77-11',
  //   doctorID: '9e1de935-9df7-4dff-91f5-edf973c9d84c',
  // };
  try {
    await doctorsTable.create({
      firstName: 'Richard',
      lastName: 'Karpovich',
      gender: 'Male',
      fullAge: 47,
      position: 'Paramedic',
      phoneNumber: '+375 (29) 888-77-11',
      doctorID: '9e1de935-9df7-4dff-91f5-edf973c9d84c',
    });
  } catch (error) {
    console.log(error);
  }
};

import databaseDefine from './createDatabase.js';
import {
  patientsDefine, credentialsDefine,
  medicalCardsDefine, resolutionsDefine,
} from './tables/index.js';

export default async () => {
  await databaseDefine();
  await medicalCardsDefine();
  await credentialsDefine();
  await patientsDefine();
  await resolutionsDefine();
};

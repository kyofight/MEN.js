import Customer from '../models/customer.model';
import SeedHelper from '../../core/helpers/seed.helper';

export default function () {
  return SeedHelper.cleanAndCreate(Customer, 'Customer',
    [
      {
        _id: "58242673400d450e25f933f1",
        username: 'Kyo',
        preference: {
          ageFrom: 5,
          ageTo: 15,
          species: ['dog', 'rabbit'],
          breed: ['terrier', 'poodle']
        }
      },
      {
        _id: "5796dfe0e814e60401e175bd",
        username: 'Chris',
        preference: {
          ageFrom: 3,
          species: ['cat', 'rabbit']
        }
      },
    ]);
}
  
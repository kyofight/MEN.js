import Customer from '../models/customers.model';
import * as SeedHelper from '../../core/helpers/seed.helper';

export default function () {
  return SeedHelper.cleanAndCreate(Customer, 'Customer',
    [
      {
        _id: "58242673400d450e25f933f1",
        username: 'Kyo',
      },
      {
        _id: "5796dfe0e814e60401e175bd",
        username: 'Chris',
      },
    ]);
}
  
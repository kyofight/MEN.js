import Pet from '../models/pet.model';
import SeedHelper from '../../core/helpers/seed.helper';
import moment from 'moment';

export default function () {
  return SeedHelper.cleanAndCreate(Pet, 'Pet',
    [
      {
        _id: "580d84ee3731f70996579a65",
        name: 'Doggy',
        availableFrom: moment().add(-5, 'days'),
        attributes: {
          age: 10,
          specie: 'dog',
          breed: 'terrier'
        },
      },
      {
        _id: "57a42ccb8bc7e0b30a2b18e8",
        name: 'Catty',
        availableFrom: moment().add(30, 'days'),
        attributes: {
          age: 5,
          specie: 'cat',
        },
      },
    ]);
}
  
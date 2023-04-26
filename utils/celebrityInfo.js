import { format } from 'date-fns'

export const getCelebrityInfo = (celebrity) => [
  {
    id: 0,
    name: 'Present Rank:',
    value: celebrity.present_ranking,
  },
  {
    id: 1,
    name: 'Historical Rank:',
    value: celebrity.history_ranking,
  },
  {
    id: 2,
    name: 'Date of Birth:',
    value: format(new Date(celebrity.date_of_birth), 'd MMM y'),
  },
  {
    id: 3,
    name: 'Age:',
    value: celebrity.age,
  },
  {
    id: 4,
    name: 'Profession:',
    value: celebrity.profession,
  },
  {
    id: 5,
    name: 'Nationality:',
    value: celebrity.nationality,
  },
  {
    id: 6,
    name: 'Gender:',
    value: celebrity.gender,
  },
  {
    id: 7,
    name: 'Height:',
    value: celebrity.height,
  },
]

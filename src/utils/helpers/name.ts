import {
  animals,
  adjectives,
  uniqueNamesGenerator,
} from '@joaomoreno/unique-names-generator';

function generateRandomName(): string {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  });

  return randomName;
}

export default { generateRandomName };

const education = [
  {
    id: 1,
    degree: 'B.Sc. en Ingeniería de Sistemas',
    institution: 'Universidad Central',
    startYear: 2014,
    endYear: 2018,
  },
  {
    id: 2,
    degree: 'Diplomado en Desarrollo Web',
    institution: 'Instituto Digital',
    startYear: 2019,
    endYear: 2020,
  },
];

let nextId = education.length + 1;

function listEducation() {
  return education;
}

function findEducation(id) {
  return education.find((item) => item.id === id) || null;
}

function createEducation(data) {
  const newEducation = {
    id: nextId++,
    ...data,
  };
  education.push(newEducation);
  return newEducation;
}

function updateEducation(id, updates) {
  const index = education.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  education[index] = {
    ...education[index],
    ...updates,
  };

  return education[index];
}

function removeEducation(id) {
  const index = education.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [removedItem] = education.splice(index, 1);
  return removedItem;
}

module.exports = {
  listEducation,
  findEducation,
  createEducation,
  updateEducation,
  removeEducation,
};

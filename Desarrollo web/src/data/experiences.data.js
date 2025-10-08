const experiences = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Tech Solutions',
    startDate: '2020-03',
    endDate: '2022-06',
    description: 'Desarrollo de interfaces web responsivas y accesibles.',
  },
  {
    id: 2,
    role: 'Full Stack Engineer',
    company: 'InnovateX',
    startDate: '2022-07',
    endDate: null,
    description: 'Diseño y mantenimiento de APIs y aplicaciones SPA.',
  },
];

let nextId = experiences.length + 1;

function listExperiences() {
  return experiences;
}

function findExperience(id) {
  return experiences.find((experience) => experience.id === id) || null;
}

function createExperience(data) {
  const newExperience = {
    id: nextId++,
    ...data,
  };
  experiences.push(newExperience);
  return newExperience;
}

function updateExperience(id, updates) {
  const index = experiences.findIndex((experience) => experience.id === id);
  if (index === -1) {
    return null;
  }

  experiences[index] = {
    ...experiences[index],
    ...updates,
  };

  return experiences[index];
}

function removeExperience(id) {
  const index = experiences.findIndex((experience) => experience.id === id);
  if (index === -1) {
    return null;
  }

  const [removedExperience] = experiences.splice(index, 1);
  return removedExperience;
}

module.exports = {
  listExperiences,
  findExperience,
  createExperience,
  updateExperience,
  removeExperience,
};

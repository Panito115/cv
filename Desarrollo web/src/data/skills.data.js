const skills = [
  {
    id: 1,
    name: 'JavaScript',
    level: 'Expert',
  },
  {
    id: 2,
    name: 'Node.js',
    level: 'Advanced',
  },
  {
    id: 3,
    name: 'TypeScript',
    level: 'Intermediate',
  },
  {
    id: 4,
    name: 'Python',
    level: 'Advanced',
  },
];

let nextId = skills.length + 1;

function listSkills() {
  return skills;
}

function findSkill(id) {
  return skills.find((skill) => skill.id === id) || null;
}

function createSkill(data) {
  const newSkill = {
    id: nextId++,
    ...data,
  };
  skills.push(newSkill);
  return newSkill;
}

function updateSkill(id, updates) {
  const index = skills.findIndex((skill) => skill.id === id);
  if (index === -1) {
    return null;
  }

  skills[index] = {
    ...skills[index],
    ...updates,
  };

  return skills[index];
}

function removeSkill(id) {
  const index = skills.findIndex((skill) => skill.id === id);
  if (index === -1) {
    return null;
  }

  const [removedSkill] = skills.splice(index, 1);
  return removedSkill;
}

module.exports = {
  listSkills,
  findSkill,
  createSkill,
  updateSkill,
  removeSkill,
};

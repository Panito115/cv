const express = require('express');
const {
  listSkills,
  findSkill,
  createSkill,
  updateSkill,
  removeSkill,
} = require('../data/skills.data');
const {
  validateRequiredString,
  validateSkillLevel,
} = require('../utils/validate');

const router = express.Router();

function parseId(param) {
  const id = Number.parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

function collectSkillErrors(payload, { partial = false } = {}) {
  const errors = [];
  const hasName = Object.prototype.hasOwnProperty.call(payload, 'name');
  const hasLevel = Object.prototype.hasOwnProperty.call(payload, 'level');

  if (!partial || hasName) {
    const nameError = validateRequiredString(payload.name, 'name');
    if (nameError) {
      errors.push(nameError);
    }
  }

  if (!partial || hasLevel) {
    const levelError = validateSkillLevel(payload.level);
    if (levelError) {
      errors.push(levelError);
    }
  }

  return errors;
}

router.get('/', (req, res) => {
  const data = listSkills();
  res.status(200).json({ message: 'ok', data });
});

router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const skill = findSkill(id);
  if (!skill) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: skill });
});

router.post('/', (req, res) => {
  const errors = collectSkillErrors(req.body);

  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const newSkill = createSkill({
    name: req.body.name.trim(),
    level: req.body.level,
  });

  return res.status(201).json({ message: 'ok', data: newSkill });
});

router.patch('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const existingSkill = findSkill(id);
  if (!existingSkill) {
    return res.status(404).json({ message: 'not_found' });
  }

  const errors = collectSkillErrors(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'name')) {
    updates.name = req.body.name.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'level')) {
    updates.level = req.body.level;
  }

  const updatedSkill = updateSkill(id, updates);

  return res.status(200).json({ message: 'ok', data: updatedSkill });
});

router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const removedSkill = removeSkill(id);
  if (!removedSkill) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: removedSkill });
});

module.exports = router;

const express = require('express');
const {
  listExperiences,
  findExperience,
  createExperience,
  updateExperience,
  removeExperience,
} = require('../data/experiences.data');
const {
  validateRequiredString,
  validateOptionalString,
  validateYearMonth,
  validateNullableYearMonth,
} = require('../utils/validate');

const router = express.Router();

function parseId(param) {
  const id = Number.parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

function collectExperienceErrors(payload, { partial = false } = {}) {
  const errors = [];
  const hasRole = Object.prototype.hasOwnProperty.call(payload, 'role');
  const hasCompany = Object.prototype.hasOwnProperty.call(payload, 'company');
  const hasStartDate = Object.prototype.hasOwnProperty.call(payload, 'startDate');
  const hasEndDate = Object.prototype.hasOwnProperty.call(payload, 'endDate');
  const hasDescription = Object.prototype.hasOwnProperty.call(payload, 'description');

  if (!partial || hasRole) {
    const roleError = validateRequiredString(payload.role, 'role');
    if (roleError) {
      errors.push(roleError);
    }
  }

  if (!partial || hasCompany) {
    const companyError = validateRequiredString(payload.company, 'company');
    if (companyError) {
      errors.push(companyError);
    }
  }

  if (!partial || hasStartDate) {
    const startDateError = validateYearMonth(payload.startDate, 'startDate');
    if (startDateError) {
      errors.push(startDateError);
    }
  }

  if (!partial || hasEndDate) {
    const endDateError = validateNullableYearMonth(payload.endDate, 'endDate');
    if (endDateError) {
      errors.push(endDateError);
    }
  }

  if (hasDescription) {
    const descriptionError = validateOptionalString(payload.description, 'description');
    if (descriptionError) {
      errors.push(descriptionError);
    }
  }

  return errors;
}

router.get('/', (req, res) => {
  const data = listExperiences();
  res.status(200).json({ message: 'ok', data });
});

router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const experience = findExperience(id);
  if (!experience) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: experience });
});

router.post('/', (req, res) => {
  const errors = collectExperienceErrors(req.body);
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const newExperience = createExperience({
    role: req.body.role.trim(),
    company: req.body.company.trim(),
    startDate: req.body.startDate.trim(),
    endDate: req.body.endDate === null || req.body.endDate === undefined ? null : req.body.endDate.trim(),
    description:
      typeof req.body.description === 'string' ? req.body.description.trim() : req.body.description ?? null,
  });

  return res.status(201).json({ message: 'ok', data: newExperience });
});

router.patch('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const existingExperience = findExperience(id);
  if (!existingExperience) {
    return res.status(404).json({ message: 'not_found' });
  }

  const errors = collectExperienceErrors(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'role')) {
    updates.role = req.body.role.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'company')) {
    updates.company = req.body.company.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'startDate')) {
    updates.startDate = req.body.startDate.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'endDate')) {
    updates.endDate =
      req.body.endDate === null || req.body.endDate === undefined ? null : req.body.endDate.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'description')) {
    updates.description =
      typeof req.body.description === 'string' ? req.body.description.trim() : req.body.description ?? null;
  }

  const updatedExperience = updateExperience(id, updates);

  return res.status(200).json({ message: 'ok', data: updatedExperience });
});

router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const removedExperience = removeExperience(id);
  if (!removedExperience) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: removedExperience });
});

module.exports = router;

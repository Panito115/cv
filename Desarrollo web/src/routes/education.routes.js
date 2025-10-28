const express = require('express');
const {
  listEducation,
  findEducation,
  createEducation,
  updateEducation,
  removeEducation,
} = require('../data/education.data');
const {
  validateRequiredString,
  validateRequiredNumber,
  validateNullableNumber,
} = require('../utils/validate');

const router = express.Router();

function parseId(param) {
  const id = Number.parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

function collectEducationErrors(payload, { partial = false } = {}) {
  const errors = [];
  const hasDegree = Object.prototype.hasOwnProperty.call(payload, 'degree');
  const hasInstitution = Object.prototype.hasOwnProperty.call(payload, 'institution');
  const hasStartYear = Object.prototype.hasOwnProperty.call(payload, 'startYear');
  const hasEndYear = Object.prototype.hasOwnProperty.call(payload, 'endYear');

  if (!partial || hasDegree) {
    const degreeError = validateRequiredString(payload.degree, 'degree');
    if (degreeError) {
      errors.push(degreeError);
    }
  }

  if (!partial || hasInstitution) {
    const institutionError = validateRequiredString(payload.institution, 'institution');
    if (institutionError) {
      errors.push(institutionError);
    }
  }

  if (!partial || hasStartYear) {
    const startYearError = validateRequiredNumber(payload.startYear, 'startYear');
    if (startYearError) {
      errors.push(startYearError);
    }
  }

  if (hasEndYear) {
    const endYearError = validateNullableNumber(payload.endYear, 'endYear');
    if (endYearError) {
      errors.push(endYearError);
    }
  }

  return errors;
}

router.get('/', (req, res) => {
  const data = listEducation();
  res.status(200).json({ message: 'ok', data });
});

router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const education = findEducation(id);
  if (!education) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: education });
});

router.post('/', (req, res) => {
  const errors = collectEducationErrors(req.body);
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const newEducation = createEducation({
    degree: req.body.degree.trim(),
    institution: req.body.institution.trim(),
    startYear: req.body.startYear,
    endYear: req.body.endYear ?? null,
  });

  return res.status(201).json({ message: 'ok', data: newEducation });
});

router.patch('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const existing = findEducation(id);
  if (!existing) {
    return res.status(404).json({ message: 'not_found' });
  }

  const errors = collectEducationErrors(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'degree')) {
    updates.degree = req.body.degree.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'institution')) {
    updates.institution = req.body.institution.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'startYear')) {
    updates.startYear = req.body.startYear;
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'endYear')) {
    updates.endYear = req.body.endYear ?? null;
  }

  const updated = updateEducation(id, updates);

  return res.status(200).json({ message: 'ok', data: updated });
});

router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const removed = removeEducation(id);
  if (!removed) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: removed });
});

module.exports = router;

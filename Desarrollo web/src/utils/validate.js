const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

function validateRequiredString(value, field) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { field, issue: 'required' };
  }
  return null;
}

function validateOptionalString(value, field) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== 'string') {
    return { field, issue: 'invalid_type' };
  }

  return null;
}

function validateSkillLevel(value) {
  if (typeof value !== 'string' || !SKILL_LEVELS.includes(value)) {
    return { field: 'level', issue: 'invalid_level' };
  }
  return null;
}

function validateYearMonth(value, field) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { field, issue: 'required' };
  }

  const formatted = value.trim();
  const pattern = /^\d{4}-(0[1-9]|1[0-2])$/;
  if (!pattern.test(formatted)) {
    return { field, issue: 'invalid_format' };
  }

  return null;
}

function validateNullableYearMonth(value, field) {
  if (value === null || value === undefined) {
    return null;
  }
  return validateYearMonth(value, field);
}

function validateRequiredNumber(value, field) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return { field, issue: 'required' };
  }

  if (!Number.isInteger(value)) {
    return { field, issue: 'invalid_number' };
  }

  return null;
}

function validateNullableNumber(value, field) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isInteger(value)) {
    return { field, issue: 'invalid_number' };
  }

  return null;
}

module.exports = {
  SKILL_LEVELS,
  validateRequiredString,
  validateOptionalString,
  validateSkillLevel,
  validateYearMonth,
  validateNullableYearMonth,
  validateRequiredNumber,
  validateNullableNumber,
};

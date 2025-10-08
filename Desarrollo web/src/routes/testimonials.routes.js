const express = require('express');
const {
  listTestimonials,
  findTestimonial,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
} = require('../data/testimonials.data');
const { validateRequiredString } = require('../utils/validate');

const router = express.Router();

function parseId(param) {
  const id = Number.parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

function collectTestimonialErrors(payload, { partial = false } = {}) {
  const errors = [];
  const hasAuthor = Object.prototype.hasOwnProperty.call(payload, 'author');
  const hasRelation = Object.prototype.hasOwnProperty.call(payload, 'relation');
  const hasQuote = Object.prototype.hasOwnProperty.call(payload, 'quote');

  if (!partial || hasAuthor) {
    const authorError = validateRequiredString(payload.author, 'author');
    if (authorError) {
      errors.push(authorError);
    }
  }

  if (!partial || hasRelation) {
    const relationError = validateRequiredString(payload.relation, 'relation');
    if (relationError) {
      errors.push(relationError);
    }
  }

  if (!partial || hasQuote) {
    const quoteError = validateRequiredString(payload.quote, 'quote');
    if (quoteError) {
      errors.push(quoteError);
    }
  }

  return errors;
}

router.get('/', (req, res) => {
  const data = listTestimonials();
  res.status(200).json({ message: 'ok', data });
});

router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const testimonial = findTestimonial(id);
  if (!testimonial) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: testimonial });
});

router.post('/', (req, res) => {
  const errors = collectTestimonialErrors(req.body);
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const newTestimonial = createTestimonial({
    author: req.body.author.trim(),
    relation: req.body.relation.trim(),
    quote: req.body.quote.trim(),
  });

  return res.status(201).json({ message: 'ok', data: newTestimonial });
});

router.patch('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const existing = findTestimonial(id);
  if (!existing) {
    return res.status(404).json({ message: 'not_found' });
  }

  const errors = collectTestimonialErrors(req.body, { partial: true });
  if (errors.length > 0) {
    return res.status(422).json({ message: 'validation_error', errors });
  }

  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body, 'author')) {
    updates.author = req.body.author.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'relation')) {
    updates.relation = req.body.relation.trim();
  }
  if (Object.prototype.hasOwnProperty.call(req.body, 'quote')) {
    updates.quote = req.body.quote.trim();
  }

  const updated = updateTestimonial(id, updates);

  return res.status(200).json({ message: 'ok', data: updated });
});

router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(404).json({ message: 'not_found' });
  }

  const removed = removeTestimonial(id);
  if (!removed) {
    return res.status(404).json({ message: 'not_found' });
  }

  return res.status(200).json({ message: 'ok', data: removed });
});

module.exports = router;

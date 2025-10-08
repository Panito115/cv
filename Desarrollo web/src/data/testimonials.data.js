const testimonials = [
  {
    id: 1,
    author: 'María López',
    relation: 'Project Manager',
    quote: 'Trabajar con Juan ha sido un gusto; entrega soluciones creativas y a tiempo.',
  },
  {
    id: 2,
    author: 'Carlos Pérez',
    relation: 'CTO',
    quote: 'Su dominio de frameworks modernos ha elevado la calidad de nuestros productos.',
  },
];

let nextId = testimonials.length + 1;

function listTestimonials() {
  return testimonials;
}

function findTestimonial(id) {
  return testimonials.find((testimonial) => testimonial.id === id) || null;
}

function createTestimonial(data) {
  const newTestimonial = {
    id: nextId++,
    ...data,
  };
  testimonials.push(newTestimonial);
  return newTestimonial;
}

function updateTestimonial(id, updates) {
  const index = testimonials.findIndex((testimonial) => testimonial.id === id);
  if (index === -1) {
    return null;
  }

  testimonials[index] = {
    ...testimonials[index],
    ...updates,
  };

  return testimonials[index];
}

function removeTestimonial(id) {
  const index = testimonials.findIndex((testimonial) => testimonial.id === id);
  if (index === -1) {
    return null;
  }

  const [removedTestimonial] = testimonials.splice(index, 1);
  return removedTestimonial;
}

module.exports = {
  listTestimonials,
  findTestimonial,
  createTestimonial,
  updateTestimonial,
  removeTestimonial,
};

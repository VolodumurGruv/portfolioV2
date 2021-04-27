const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extention = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) {
          return helpers.error("string.escapeHTML", { value });
        }
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extention);

module.exports.msgJoiSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required().escapeHTML(),
  message: Joi.string().min(5).required().escapeHTML(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  date: Joi.date(),
});

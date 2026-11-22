// Validation schemas — re-exported from the local validator.
// See src/lib/validate.ts for the reason zod is not used directly.
export {
  registerSchema,
  loginSchema,
  eligibilitySchema,
  contactSchema,
  caseNoteSchema,
  messageSchema,
  fieldErrors,
  type Issue,
  type ParseError,
  type ParseResult,
} from "./validate";

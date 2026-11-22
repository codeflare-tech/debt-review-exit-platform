// ============================================================
// LIGHTWEIGHT VALIDATION — local replacement for zod.
// The installed zod@3.25.0 publishes source without a compiled
// dist/, so it cannot be required at runtime. This module keeps
// the same { success, data, error.issues } contract used by the
// API routes, with zero external dependencies.
// ============================================================

export type Issue = { path: string[]; message: string };
export type ParseError = { issues: Issue[] };
export type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: ParseError };

type Rule = (value: unknown, path: string[]) => Issue[];

const issue = (path: string[], message: string): Issue[] => [{ path, message }];

function required(name: string): Rule {
  return (v, p) => {
    if (v === undefined || v === null || (typeof v === "string" && v.trim() === "")) {
      return issue([...p, name], `${name} is required`);
    }
    return [];
  };
}
function minLen(name: string, n: number): Rule {
  return (v, p) =>
    typeof v === "string" && v.length < n
      ? issue([...p, name], `Must be at least ${n} characters`)
      : [];
}
function maxLen(name: string, n: number): Rule {
  return (v, p) =>
    typeof v === "string" && v.length > n ? issue([...p, name], `Must be at most ${n} characters`) : [];
}
function isEmail(name: string): Rule {
  return (v, p) =>
    typeof v === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? issue([...p, name], "Enter a valid email address")
      : [];
}
function matches(name: string, re: RegExp, msg: string): Rule {
  return (v, p) => (typeof v === "string" && !re.test(v) ? issue([...p, name], msg) : []);
}
function minNum(name: string, n: number): Rule {
  return (v, p) => (typeof v === "number" && v < n ? issue([...p, name], `Must be at least ${n}`) : []);
}
function isNumber(name: string): Rule {
  return (v, p) => (typeof v !== "number" || Number.isNaN(v) ? issue([...p, name], "Must be a number") : []);
}
function isInt(name: string): Rule {
  return (v, p) => (typeof v === "number" && !Number.isInteger(v) ? issue([...p, name], "Must be a whole number") : []);
}
function isBool(name: string): Rule {
  return (v, p) => (typeof v !== "boolean" ? issue([...p, name], "Must be true or false") : []);
}

type Rules = Record<string, Rule[]>;
type Refine<T> = (data: T) => Issue[];

function validate<T extends Record<string, unknown>>(
  input: unknown,
  rules: Rules,
  refines: Refine<T>[] = [],
): ParseResult<T> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { success: false, error: { issues: issue([], "Expected a JSON object") } };
  }
  const source = input as Record<string, unknown>;
  const issues: Issue[] = [];
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) issues.push(...rule(source[field], []));
  }
  if (issues.length === 0) {
    for (const refine of refines) issues.push(...refine(source as T));
  }
  if (issues.length) return { success: false, error: { issues } };
  return { success: true, data: source as T };
}

export function fieldErrors(error: ParseError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of error.issues) {
    const key = i.path.join(".") || "form";
    if (!out[key]) out[key] = i.message;
  }
  return out;
}

// ---- Schemas (same names/contract as the previous zod schemas) ----

export const registerSchema = {
  safeParse(input: unknown) {
    return validate<Record<string, unknown>>(
      input,
      {
        fullName: [required("fullName"), minLen("fullName", 2), maxLen("fullName", 120)],
        email: [required("email"), isEmail("email")],
        phone: [required("phone"), minLen("phone", 9), maxLen("phone", 20)],
        password: [
          required("password"),
          minLen("password", 10),
          matches("password", /[A-Z]/, "Password must contain an uppercase letter"),
          matches("password", /[0-9]/, "Password must contain a number"),
        ],
        confirmPassword: [required("confirmPassword")],
        idNumber: [required("idNumber"), minLen("idNumber", 6), maxLen("idNumber", 20)],
      },
      [
        (d) =>
          d.password === d.confirmPassword
            ? []
            : issue(["confirmPassword"], "Passwords do not match"),
      ],
    );
  },
};

export const loginSchema = {
  safeParse(input: unknown) {
    return validate(input, {
      email: [required("email"), isEmail("email")],
      password: [required("password")],
    });
  },
};

export const eligibilitySchema = {
  safeParse(input: unknown) {
    return validate(input, {
      reference: [],
      fullName: [required("fullName"), minLen("fullName", 2)],
      email: [required("email"), isEmail("email")],
      mobile: [],
      province: [],
      noOfDebts: [isNumber("noOfDebts"), isInt("noOfDebts"), minNum("noOfDebts", 0)],
      totalDebt: [isNumber("totalDebt"), minNum("totalDebt", 0)],
      noOfCreditSearches: [isNumber("noOfCreditSearches"), isInt("noOfCreditSearches"), minNum("noOfCreditSearches", 0)],
      moreThanOneCreditor: [isBool("moreThanOneCreditor")],
      underDebtReview: [isBool("underDebtReview")],
      hasCourtOrder: [isBool("hasCourtOrder")],
      settledAllDebts: [isBool("settledAllDebts")],
      hasHomeLoan: [isBool("hasHomeLoan")],
      hasArrears: [isBool("hasArrears")],
      hasClearanceCertificate: [isBool("hasClearanceCertificate")],
      knowsDebtCounsellor: [isBool("knowsDebtCounsellor")],
      hasSupportingDocuments: [isBool("hasSupportingDocuments")],
      reasonForExiting: [],
    });
  },
};

export const contactSchema = {
  safeParse(input: unknown) {
    return validate(input, {
      name: [required("name"), minLen("name", 2), maxLen("name", 120)],
      email: [required("email"), isEmail("email")],
      subject: [required("subject"), minLen("subject", 3), maxLen("subject", 200)],
      message: [required("message"), minLen("message", 10), maxLen("message", 5000)],
    });
  },
};

export const caseNoteSchema = {
  safeParse(input: unknown) {
    return validate(input, {
      caseId: [required("caseId")],
      note: [required("note"), minLen("note", 1), maxLen("note", 5000)],
      isInternal: [isBool("isInternal")],
    });
  },
};

export const messageSchema = {
  safeParse(input: unknown) {
    return validate(input, {
      applicationId: [required("applicationId")],
      recipientId: [required("recipientId")],
      body: [required("body"), minLen("body", 1), maxLen("body", 5000)],
    });
  },
};

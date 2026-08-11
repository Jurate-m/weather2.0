import { describe, it, expect } from "vitest";
import { validCoords, normalize, validateString } from "@/_lib/validate";

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

describe("normalize", () => {
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
    expect(normalize(val)).toBe(expected);
  });
});

describe("sanitizes", () => {
  it("sanitizes case and whitespace without stripping markup", () => {
    expect(normalize("  <SCRIPT>alert(1)</SCRIPT>  ")).toBe(
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
    {
      query: "jeje talab 1139211",
      expected: {
        q: "",
        param: "invalid_chars",
      },
    },
  ])("$query -> $expected", ({ query, expected }) => {
    expect(validateString(query, type).message).toBe(expected[type]);
  });
});

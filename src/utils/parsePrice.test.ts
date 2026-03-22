import { describe, it, expect } from "vitest";
import { parsePrice } from "./parsePrice";

describe("parsePrice", () => {
  it("parses a standard price string with $ symbol", () => {
    expect(parsePrice("$19.99")).toBe(19.99);
  });

  it("parses a standard price string without the $ symbol", () => {
    expect(parsePrice("19.99")).toBe(19.99);
  });

  it("returns 0 when an unparseable string is provided", () => {
    expect(parsePrice("abc")).toBe(0);
  });

  it("returns 0 when an empty string is provided", () => {
    expect(parsePrice("")).toBe(0);
  });

  it("parses a string correctly when it includes a comma", () => {
    expect(parsePrice("$1,999.99")).toBe(1999.99);
  });
});

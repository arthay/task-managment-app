import getRandomId from "./getRandomId";

describe("getRandomId", () => {
  it("should return a string", () => {
    const id = getRandomId();
    expect(typeof id).toBe("string");
    expect(id).not.toHaveLength(0);
  });

  it("should return a unique id on subsequent calls", () => {
    const firstId = getRandomId();
    const secondId = getRandomId();
    expect(firstId).not.toBe(secondId);
  });
});

function getRandomId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now();
}

export default getRandomId;

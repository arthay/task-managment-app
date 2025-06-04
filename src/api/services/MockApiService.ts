class MockApiService {
  protected delay(ms = 300) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default MockApiService;

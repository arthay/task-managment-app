class MockApiService {
  protected delay(ms = 300) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async request<TResponseData>(
    action: () => Promise<TResponseData>,
    delay?: number,
  ): Promise<TResponseData> {
    await this.delay(delay);
    if (!localStorage.getItem("token")) {
      throw "Unauthorized";
    }

    return await action();
  }
}

export default MockApiService;

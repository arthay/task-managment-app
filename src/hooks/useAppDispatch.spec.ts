import { renderHook } from "@testing-library/react";
import useAppDispatch from "./useAppDispatch";
import StoreProviderWrapper from "@/testUtils/mocks/wrappers/StoreProviderWrapper";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("useAppDispatch", () => {
  it("should return the mocked dispatch from react-redux", () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: StoreProviderWrapper,
    });
    expect(result.current).toBe(mockDispatch);
  });
});

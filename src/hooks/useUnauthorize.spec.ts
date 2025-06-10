import { renderHook } from "@testing-library/react";
import useUnauthorize from "./useUnauthorize";
import StoreProviderWrapper from "@/testUtils/mocks/wrappers/StoreProviderWrapper";

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("useUnauthorize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not navigate or dispatch when no error is passed", () => {
    renderHook(() => useUnauthorize(), {
      wrapper: StoreProviderWrapper,
    });
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should not navigate or dispatch when error message is not 'Unauthorized'", () => {
    renderHook(() => useUnauthorize(new Error("Forbidden")), {
      wrapper: StoreProviderWrapper,
    });
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should navigate to /login and dispatch reset actions when error is 'Unauthorized'", () => {
    renderHook(() => useUnauthorize(new Error("Unauthorized")), {
      wrapper: StoreProviderWrapper,
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

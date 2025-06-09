import { renderHook, act } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import * as useAppDispatch from "@/hooks/useAppDispatch";
import useProjectsQuery from "@/hooks/queries/useProjectsQuery";

jest.mock("react-redux", () => {
  return {
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
  };
});

describe("useProjectsQuery", () => {
  let mockDispatch: jest.Mock;
  const mockUseSelector = ReactRedux.useSelector as unknown as jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    jest.spyOn(useAppDispatch, "default").mockReturnValue(mockDispatch);
    mockUseSelector.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should dispatch fetchProjects if projects array is empty", async () => {
    const fakeState = {
      projects: [],
      hasNextPage: false,
      isFetchPending: false,
      isFetchingNextPage: false,
      error: null,
    };
    mockUseSelector.mockReturnValue(fakeState);

    await act(async () => {
      renderHook(() => useProjectsQuery({ page: 1, pageSize: 10 }));
    });

    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction).toBeDefined();
  });

  it("should not dispatch fetchProjects if projects already exist", async () => {
    const fakeState = {
      projects: [
        { id: "1", name: "Project 1", date: new Date().toISOString() },
      ],
      hasNextPage: false,
      isFetchPending: false,
      isFetchingNextPage: false,
      error: null,
    };
    mockUseSelector.mockReturnValue(fakeState);

    await act(async () => {
      renderHook(() => useProjectsQuery({}));
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should dispatch fetchNextPageProjects when fetchNextPage is called and conditions are met", async () => {
    const fakeState = {
      projects: [
        { id: "1", name: "Project 1", date: new Date().toISOString() },
        { id: "2", name: "Project 2", date: new Date().toISOString() },
      ],
      hasNextPage: true,
      isFetchPending: false,
      isFetchingNextPage: false,
      error: null,
    };
    mockUseSelector.mockReturnValue(fakeState);

    const { result } = renderHook(() =>
      useProjectsQuery({ page: 1, pageSize: 10 }),
    );

    await act(async () => {
      result.current.fetchNextPage();
    });

    expect(mockDispatch).toHaveBeenCalled();
    const dispatchedAction = mockDispatch.mock.calls[0][0];
    expect(dispatchedAction).toBeDefined();
  });

  it("should not dispatch fetchNextPageProjects when fetchNextPage is called but hasNextPage is false", async () => {
    const fakeState = {
      projects: [
        { id: "1", name: "Project 1", date: new Date().toISOString() },
      ],
      hasNextPage: false,
      isFetchPending: false,
      isFetchingNextPage: false,
      error: null,
    };
    mockUseSelector.mockReturnValue(fakeState);

    const { result } = renderHook(() =>
      useProjectsQuery({ page: 1, pageSize: 10 }),
    );

    await act(async () => {
      result.current.fetchNextPage();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

import { renderHook } from "@testing-library/react";
import useLoadMoreEntities from "./useLoadMoreEntities";

describe("useLoadMoreEntities", () => {
  let mockObserve: jest.Mock;
  let mockDisconnect: jest.Mock;
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockDisconnect = jest.fn();

    window.IntersectionObserver = jest.fn((callback) => {
      intersectionCallback = callback;

      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      } as unknown as IntersectionObserver;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should observe the node and call fetchNextPage when intersecting and hasNextPage is true", () => {
    const fetchNextPage = jest.fn();
    const isFetchingNextPage = false;
    const hasNextPage = true;
    const { result } = renderHook(() =>
      useLoadMoreEntities(fetchNextPage, isFetchingNextPage, hasNextPage),
    );

    const div = document.createElement("div");
    result.current(div);

    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(div);

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("should not call fetchNextPage when intersecting if hasNextPage is false", () => {
    const fetchNextPage = jest.fn();
    const isFetchingNextPage = false;
    const hasNextPage = false;
    const { result } = renderHook(() =>
      useLoadMoreEntities(fetchNextPage, isFetchingNextPage, hasNextPage),
    );

    const div = document.createElement("div");
    result.current(div);

    expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(div);

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("should not set up observer when isFetchingNextPage is true", () => {
    const fetchNextPage = jest.fn();
    const isFetchingNextPage = true;
    const hasNextPage = true;
    const { result } = renderHook(() =>
      useLoadMoreEntities(fetchNextPage, isFetchingNextPage, hasNextPage),
    );

    const div = document.createElement("div");
    result.current(div);

    expect(window.IntersectionObserver).not.toHaveBeenCalled();
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it("should disconnect previous observer when a new node is provided", () => {
    const fetchNextPage = jest.fn();
    const isFetchingNextPage = false;
    const hasNextPage = true;
    const { result } = renderHook(() =>
      useLoadMoreEntities(fetchNextPage, isFetchingNextPage, hasNextPage),
    );

    const firstDiv = document.createElement("div");
    result.current(firstDiv);
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledWith(firstDiv);

    const secondDiv = document.createElement("div");
    result.current(secondDiv);

    expect(mockDisconnect).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(secondDiv);
  });
});

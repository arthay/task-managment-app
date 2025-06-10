import { render, screen, fireEvent } from "@testing-library/react";
import TasksList from "./index";
import useTasksQuery from "@/hooks/queries/useTasksQuery";
import useDeleteTaskMutation from "@/hooks/mutations/useDeleteTaskMutation";
import { MemoryRouter, useParams } from "react-router-dom";
import useLoadMoreEntities from "@/hooks/useLoadMoreEntities";
import testIds from "@/components/TasksList/testIds";
import taskItemTestIds from "@/components/TaskItem/testIds";
import ConfirmModalMock, {
  type I_ConfirmModalMockProps,
} from "@/testUtils/mocks/components/ConfirmModalMock";

jest.mock("@/hooks/queries/useTasksQuery");
jest.mock("@/hooks/mutations/useDeleteTaskMutation");
jest.mock("@/hooks/useLoadMoreEntities");
jest.mock("@/hooks/useUnauthorize");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("@/components/common/TaskModal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    onOpenChange,
  }: {
    isOpen: boolean;
    onOpenChange: () => void;
  }) => (
    <div data-testid={testIds.taskModal}>
      {isOpen ? "TaskModal Open" : "TaskModal Closed"}
      <button data-testid={testIds.closeTaskModal} onClick={onOpenChange}>
        close modal
      </button>
    </div>
  ),
}));

jest.mock("@/components/common/ConfirmModal", () => ({
  __esModule: true,
  default: (props: I_ConfirmModalMockProps) => <ConfirmModalMock {...props} />,
}));

const mockedUseTasksQuery = useTasksQuery as jest.Mock;
const mockedUseDeleteTaskMutation = useDeleteTaskMutation as jest.Mock;
const mockedUseParams = useParams as jest.Mock;

describe("TasksList", () => {
  const fakeTasks = [
    {
      id: "1",
      title: "Task One",
      description: "Description One",
      status: "PENDING",
      priority: "LOW",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Task Two",
      description: "Description Two",
      status: "PENDING",
      priority: "MEDIUM",
      date: new Date().toISOString(),
    },
  ];

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <TasksList />
      </MemoryRouter>,
    );
  };

  const mockFetchNextPage = jest.fn();
  const mockDeleteProject = jest.fn().mockResolvedValue(undefined);
  const mockLoadMoreRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseParams.mockReturnValue({ projectId: "123" });

    mockedUseTasksQuery.mockReturnValue({
      data: { tasks: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
    });

    mockedUseDeleteTaskMutation.mockReturnValue({
      mutateAsync: mockDeleteProject,
      isPending: false,
    });

    (useLoadMoreEntities as jest.Mock).mockReturnValue(mockLoadMoreRef);
  });

  it("should render a loader when tasks are loading", () => {
    mockedUseTasksQuery.mockReturnValue({
      data: { tasks: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: true,
      error: null,
    });

    renderComponent();

    const loader = screen.getByTestId(testIds.tasksLoading);
    expect(loader).toBeInTheDocument();
  });

  it('should render "There are no tasks yet." when tasks list is empty', () => {
    mockedUseTasksQuery.mockReturnValueOnce({
      data: { tasks: [] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
      error: null,
    });

    renderComponent();
    const noTasksMessage = screen.getByTestId(testIds.noTasks);
    expect(noTasksMessage).toBeInTheDocument();
  });

  it("should render a list of tasks", () => {
    mockedUseTasksQuery.mockReturnValue({
      data: { tasks: fakeTasks },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
      error: null,
    });

    renderComponent();

    const items = screen.getAllByTestId(taskItemTestIds.taskItem);
    expect(items.length).toBe(fakeTasks.length);

    fakeTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it('opens task modal when "Create Task" button is clicked', () => {
    renderComponent();

    const createButton = screen.getByTestId(testIds.createButton);
    fireEvent.click(createButton);

    expect(screen.getByTestId(testIds.taskModal)).toHaveTextContent(
      "TaskModal Open",
    );
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import testIds from "./testIds";
import type { I_Task } from "@/types/entities/task";
import TaskItem from "@/components/TaskItem";
import { E_TASK_PRIORITY, E_TASK_STATUS } from "@/types/enums/task";

describe("TaskItem Component", () => {
  const task: I_Task = {
    id: "1",
    projectId: "1",
    title: "Task One",
    description: "Description One",
    status: E_TASK_STATUS.PENDING,
    priority: E_TASK_PRIORITY.LOW,
    date: new Date().toISOString(),
  };

  const onEditClick = jest.fn();
  const onDeleteClick = jest.fn();

  const renderComponent = () => {
    render(
      <TaskItem
        task={task}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders task details and link correctly", () => {
    renderComponent();

    const taskItem = screen.getByTestId(testIds.taskItem);

    expect(taskItem).toBeInTheDocument();

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText(E_TASK_STATUS.PENDING)).toBeInTheDocument();
  });

  test("calls onEditClick when the edit button is clicked", () => {
    renderComponent();

    const editButton = screen.getByTestId(testIds.editTaskButton);
    fireEvent.click(editButton);
    expect(onEditClick).toHaveBeenCalledWith(task.id);
  });

  test("calls onDeleteClick when the delete button is clicked", () => {
    renderComponent();

    const deleteButton = screen.getByTestId(testIds.deleteTaskButton);
    fireEvent.click(deleteButton);
    expect(onDeleteClick).toHaveBeenCalledWith(task.id);
  });
});

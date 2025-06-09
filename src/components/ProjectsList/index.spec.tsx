import type { Ref } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import * as sonner from "sonner";
import ProjectsList from "@/components/ProjectsList";
import useProjectsQuery from "@/hooks/queries/useProjectsQuery";
import useDeleteProjectMutation from "@/hooks/mutations/useDeleteProjectMutation";
import useLoadMoreEntities from "@/hooks/useLoadMoreEntities";
import testIds from "@/components/ProjectsList/testIds";
import projectItemTestIds from "@/components/ProjectItem/testIds";
import ConfirmModalMock, {
  type I_ConfirmModalMockProps,
} from "@/testUtils/mocks/components/ConfirmModalMock";
import type { I_Project } from "@/types/entities/project";

jest.mock("@/hooks/queries/useProjectsQuery");
jest.mock("@/hooks/mutations/useDeleteProjectMutation");
jest.mock("@/hooks/useLoadMoreEntities");
jest.mock("@/hooks/useUnauthorize");

jest.mock("@/components/common/ProjectModal", () => ({
  __esModule: true,
  default: ({
    isOpen,
    onOpenChange,
  }: {
    isOpen: boolean;
    onOpenChange: () => void;
  }) => (
    <div data-testid={testIds.projectModal}>
      {isOpen ? "ProjectModal Open" : "ProjectModal Closed"}
      <button data-testid={testIds.closeProjectModal} onClick={onOpenChange}>
        close modal
      </button>
    </div>
  ),
}));

jest.mock("@/components/common/ConfirmModal", () => ({
  __esModule: true,
  default: (props: I_ConfirmModalMockProps) => <ConfirmModalMock {...props} />,
}));

jest.mock("@/components/ProjectItem", () => ({
  __esModule: true,
  default: (
    {
      project,
      onEditClick,
      onDeleteClick,
    }: {
      project: I_Project;
      onEditClick: (id: string) => void;
      onDeleteClick: (id: string) => void;
    },
    ref: Ref<HTMLDivElement>,
  ) => (
    <div ref={ref} data-testid={testIds.projectItem}>
      <div>{project.name}</div>
      <button
        data-testid={projectItemTestIds.editProjectButton}
        onClick={() => onEditClick(project.id)}
      >
        Edit
      </button>
      <button
        data-testid={projectItemTestIds.deleteProjectButton}
        onClick={() => onDeleteClick(project.id)}
      >
        Delete
      </button>
    </div>
  ),
}));

describe("ProjectsList", () => {
  const fakeProjects = [
    { id: "1", name: "Project 1", date: new Date().toISOString() },
    { id: "2", name: "Project 2", date: new Date().toISOString() },
  ];

  const mockFetchNextPage = jest.fn();
  const mockDeleteProject = jest.fn().mockResolvedValue(undefined);
  const mockLoadMoreRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useProjectsQuery as jest.Mock).mockReturnValue({
      data: { projects: fakeProjects },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
    });

    (useDeleteProjectMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteProject,
      isPending: false,
    });

    (useLoadMoreEntities as jest.Mock).mockReturnValue(mockLoadMoreRef);
  });

  it("shows loader when pending", () => {
    (useProjectsQuery as jest.Mock).mockReturnValue({
      data: { projects: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: true,
    });

    render(<ProjectsList />);
    expect(screen.getByTestId(testIds.projectsLoading)).toBeInTheDocument();
  });

  it('shows "There are no projects yet." when no projects are available', () => {
    (useProjectsQuery as jest.Mock).mockReturnValue({
      data: { projects: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isPending: false,
    });

    render(<ProjectsList />);
    expect(screen.getByTestId(testIds.noProjects)).toBeInTheDocument();
  });

  it("renders a list of projects", () => {
    render(<ProjectsList />);

    const items = screen.getAllByTestId(testIds.projectItem);
    expect(items.length).toBe(fakeProjects.length);

    fakeProjects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    });
  });

  it('opens project modal when "Create Project" button is clicked', () => {
    render(<ProjectsList />);

    expect(screen.getByTestId(testIds.projectModal)).toHaveTextContent(
      "ProjectModal Closed",
    );
    const createButton = screen.getByTestId(testIds.createButton);
    fireEvent.click(createButton);

    expect(screen.getByTestId(testIds.projectModal)).toHaveTextContent(
      "ProjectModal Open",
    );
  });

  it('closes project modal when "Close Modal" button is clicked', () => {
    render(<ProjectsList />);
    const createButton = screen.getByTestId(testIds.createButton);
    fireEvent.click(createButton);

    const closeModalButton = screen.getByTestId(testIds.closeProjectModal);
    fireEvent.click(closeModalButton);

    expect(screen.getByTestId(testIds.projectModal)).toHaveTextContent(
      "ProjectModal Closed",
    );
  });

  it('opens project modal for editing when "Edit" button is clicked', () => {
    render(<ProjectsList />);

    const editButtons = screen.getAllByTestId(
      projectItemTestIds.editProjectButton,
    );
    fireEvent.click(editButtons[0]);
    expect(screen.getByTestId(testIds.projectModal)).toHaveTextContent(
      "ProjectModal Open",
    );
  });

  it('opens confirm modal when "Delete" button is clicked and triggers deletion', async () => {
    // const toastSuccessSpy = jest.spyOn(toast, "success").mockImplementation();
    const toastSpy = jest.spyOn(sonner, "toast");
    render(<ProjectsList />);

    const deleteButtons = screen.getAllByTestId(
      projectItemTestIds.deleteProjectButton,
    );
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByTestId("confirm-modal")).toHaveTextContent(
      "ConfirmModal Open",
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Confirm"));
    });

    expect(mockDeleteProject).toHaveBeenCalledWith("1");
    expect(toastSpy).toHaveBeenCalledWith(
      "Project has been deleted successfully.",
    );

    toastSpy.mockRestore();
  });
});

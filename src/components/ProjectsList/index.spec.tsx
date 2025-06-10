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
import { MemoryRouter } from "react-router-dom";

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

describe("ProjectsList", () => {
  const fakeProjects = [
    { id: "1", name: "Project 1", date: new Date().toISOString() },
    { id: "2", name: "Project 2", date: new Date().toISOString() },
  ];

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <ProjectsList />
      </MemoryRouter>,
    );
  };

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

    renderComponent();
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

    renderComponent();
    expect(screen.getByTestId(testIds.noProjects)).toBeInTheDocument();
  });

  it("renders a list of projects", () => {
    renderComponent();

    const items = screen.getAllByTestId(projectItemTestIds.projectItem);
    expect(items.length).toBe(fakeProjects.length);

    fakeProjects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    });
  });

  it('opens project modal when "Create Project" button is clicked', () => {
    renderComponent();

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
    renderComponent();
    const createButton = screen.getByTestId(testIds.createButton);
    fireEvent.click(createButton);

    const closeModalButton = screen.getByTestId(testIds.closeProjectModal);
    fireEvent.click(closeModalButton);

    expect(screen.getByTestId(testIds.projectModal)).toHaveTextContent(
      "ProjectModal Closed",
    );
  });

  it('opens project modal for editing when "Edit" button is clicked', () => {
    renderComponent();

    const editButtons = screen.getAllByTestId(
      projectItemTestIds.editProjectButton,
    );
    fireEvent.click(editButtons[0]);
    expect(screen.getByTestId(testIds.projectModal)).toHaveTextContent(
      "ProjectModal Open",
    );
  });

  it('opens confirm modal when "Delete" button is clicked and triggers deletion', async () => {
    const toastSpy = jest.spyOn(sonner, "toast");
    renderComponent();

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

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectItem from "@/components/ProjectItem";
import type { I_Project } from "@/types/entities/project";
import testIds from "@/components/ProjectItem/testIds";

describe("ProjectItem Component", () => {
  const project: I_Project = {
    id: "1",
    name: "Test Project",
    date: "2022-01-01",
  };

  const onEditClick = jest.fn();
  const onDeleteClick = jest.fn();

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <ProjectItem
          project={project}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders project details and link correctly", () => {
    renderComponent();

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();

    const linkElement = screen.getByTestId(testIds.linkProject);
    expect(linkElement).toHaveAttribute("href", "/projects/1");
  });

  test("calls onEditClick when the edit button is clicked", () => {
    renderComponent();

    const editButton = screen.getByTestId(testIds.editProjectButton);
    fireEvent.click(editButton);
    expect(onEditClick).toHaveBeenCalledWith(project.id);
  });

  test("calls onDeleteClick when the delete button is clicked", () => {
    renderComponent();

    const deleteButton = screen.getByTestId(testIds.deleteProjectButton);
    fireEvent.click(deleteButton);
    expect(onDeleteClick).toHaveBeenCalledWith(project.id);
  });
});

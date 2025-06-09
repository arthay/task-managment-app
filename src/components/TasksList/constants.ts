import { E_TASK_PRIORITY, E_TASK_STATUS } from "@/types/enums/task";

export const TASK_PRIORITY_FILTER_OPTIONS = [
  {
    label: E_TASK_PRIORITY.LOW,
    value: E_TASK_PRIORITY.LOW,
  },
  {
    label: E_TASK_PRIORITY.MEDIUM,
    value: E_TASK_PRIORITY.MEDIUM,
  },
  {
    label: E_TASK_PRIORITY.HIGH,
    value: E_TASK_PRIORITY.HIGH,
  },
];

export const TASK_STATUS_FILTER_OPTIONS = [
  {
    label: E_TASK_STATUS.PENDING,
    value: E_TASK_STATUS.PENDING,
  },
  {
    label: E_TASK_STATUS.IN_PROGRESS,
    value: E_TASK_STATUS.IN_PROGRESS,
  },
  {
    label: E_TASK_STATUS.COMPLETED,
    value: E_TASK_STATUS.COMPLETED,
  },
];

export const TASK_SORT_BY_OPTIONS = [
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Priority",
    value: "priority",
  },
  {
    label: "Date",
    value: "date",
  },
];

export const TASK_SORT_ORDER_OPTIONS = [
  {
    label: "ASC",
    value: "asc",
  },
  {
    label: "DESC",
    value: "desc",
  },
];

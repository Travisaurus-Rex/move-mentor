import { FormSelectOption } from "../types";

export function toFormSelectOptions<T>(
  items: T[],
  nameKey: keyof T,
  idKey: keyof T,
  includeEmpty: boolean = true,
): FormSelectOption[] {
  let mapped = items.map((item: T) => ({
    name: String(item[nameKey]),
    id: String(item[idKey]),
  }));

  if (includeEmpty) {
    return [{ name: "Nothing Selected", id: "" }, ...mapped];
  }

  return mapped;
}

// Modelo de Categoría
export class Category {
  id: string;
  name: string;
  description: string;
  parentCategoryId?: string;
  active: boolean;

  constructor(
    id: string,
    name: string,
    description: string,
    parentCategoryId?: string,
    active: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parentCategoryId = parentCategoryId;
    this.active = active;
  }
}

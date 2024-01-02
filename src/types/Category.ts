export interface Category {
    id: number;
    categoryName: string;
    description: string;
  }

  export interface CategoryState {
    categories: Category[]
    loading: boolean
    error: string | null
}
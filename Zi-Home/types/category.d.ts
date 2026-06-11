interface IAddSubcategory {
  name: string;
  category: string;
}

interface IUpdateSubcategory {
  name?: string;
  category?: string;
}

interface IUpdateCategory {
  name?: string;
  icon?: string;
}

interface IAddCategory {
  name: string;
  icon?: string;
}

interface ICategory {
  name: string;
  _id?: string;
  id?: string;
  icon?: string;
}

interface ISubcategory {
  _id?: string;
  id?: string;
  name: string;
  category?: string;
}

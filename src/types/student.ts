export type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  status: "Active" | "Inactive";
};

export type StudentFormData = {
  name: string;
  email: string;
  course: string;
  status: "Active" | "Inactive";
};
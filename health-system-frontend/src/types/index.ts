// defining types for client
export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  phone: string;
  age: number;
  gender: string;
  enrolledPrograms: Program[];
}

// defining types for program
export interface Program {
  _id: string;
  name: string;
  description: string;
}
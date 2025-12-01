export interface Course {
code: any;
name: any;
  id: number;
  courseName: string;
  courseCode: string;

  teacher: {
    id: number;
    firstName: string;
    lastName: string;
  };

  students: {
    id: number;
    firstName: string;
    lastName: string;
    studentNumber: string;
  }[];

  exams: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    room: {
      id: number;
      name: string;
      capacity: number;
    };
  }[];
}

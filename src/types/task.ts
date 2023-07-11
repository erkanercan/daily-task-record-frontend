/* data: {
    "_id": "64ad78abf28ecc40e6e74d57",
    "user": {
        "_id": "64ac9ae1b180b55514727d10",
        "name": "Erkan Ercan",
        "title": "Sth",
        "email": "erkanercandev@gmail.com",
        "role": "user",
        "createdAt": "2023-07-10T23:57:21.021Z",
        "updatedAt": "2023-07-10T23:57:21.021Z",
        "__v": 0
    },
    "text": "Test Task",
    "category": "bug",
    "status": "backlog",
    "createdAt": "2023-07-11T15:43:39.600Z",
    "updatedAt": "2023-07-11T15:43:39.600Z",
    "__v": 0
} */

import { User } from "./user";

export type Category = "bug" | "feature" | "refactor";
export type Status = "backlog" | "in_progress" | "done";

export interface Task {
  _id: string;
  user: User;
  text: string;
  category: Category;
  status: Status;
}

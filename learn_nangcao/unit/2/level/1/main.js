import { questions, questionLinks } from "./data.js";
import { runLesson } from "../../../../template/template.js";

// Chỉnh số unit và level đúng theo folder hiện tại, ví dụ unit 1, level 1
runLesson(questions, 2, 1, questionLinks);

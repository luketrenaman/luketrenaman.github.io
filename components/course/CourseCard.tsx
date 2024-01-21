import { Course } from "@/resume";
import { Card } from "../Card";

export interface CourseCardProps{
  course: Course;
}
export function CourseCard({course} : CourseCardProps){
  return(
    <div className="col-3 mb-4">
      <Card>
        <p>
          {course.name} @ {course.institution}
        </p>
        <p>
          {course.start.toDateString()} to {course.end.toDateString()}
        </p>
      </Card>
    </div>
  );
}
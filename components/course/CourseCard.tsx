import { Course } from "@/resume";
import { Card } from "../Card";
import { getAbbrevMonthWithPeriod } from "@/util/date";
import { DateTag } from "../DateTag";

export interface CourseCardProps{
  course: Course;
}
export function CourseCard({course} : CourseCardProps){
  return(
    <div className="col-3 mb-4">
      <Card>
        <div className="py-3 px-2.5">
          <h3 className="text-xl font-extrabold">
            {course.name}
          </h3>
          <p className="italic">
            {course.institution}
          </p>
          <DateTag date={course.start}/>
        </div>
      </Card>
    </div>
  );
}
import { resume } from '@/resume';
export function CourseList(){
  return resume.courses.map((course, i) => (
    <div key={i}>
      <p>
        {course.name} @ {course.institution}
      </p>
      <p>
        {course.start.toDateString()} to {course.end.toDateString()}
      </p>
    </div>
  ));
}
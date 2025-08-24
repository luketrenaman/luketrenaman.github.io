import { resume } from '@/resume';
import { RowWrapper } from '../RowWrapper';
import { CourseCard } from './CourseCard';
export function CourseList(){
  return (
    <RowWrapper>
      {
        resume.courses
          .sort((a, b) => b.end.getTime() - a.end.getTime())
          .map((course, i) => (
            <CourseCard course={course} key={i}/>
          ))
      }
    </RowWrapper>
  );
}
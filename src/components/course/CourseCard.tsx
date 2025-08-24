import { Course } from "@/resume";
import { Card } from "../Card";
import { getAbbrevMonthWithPeriod } from "@/util/date";
import { DateTag } from "../DateTag";
import { motion } from "framer-motion";

export interface CourseCardProps{
  course: Course;
}
const DURATION = 0.5;

export function CourseCard({course} : CourseCardProps){
  return(
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: DURATION }}
      whileInView={{ opacity: 1 }}
      viewport={{"once":true}}
      className="col-xl-3 col-sm-6 mb-4">
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
    </motion.div>
  );
}
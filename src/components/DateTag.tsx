import { Project } from "@/resume";
import { getAbbrevMonthWithPeriod, getDayAbbrev, getFullMonth } from "@/util/date";
export interface DateTagProps{
    date: Project["end"];
}
export function DateTag({date} : DateTagProps){
  const year = date.getFullYear();
  return <span className="tag tag-date"
    title={`Finished on ${getFullMonth(date)} ${getDayAbbrev(date)}, ${year}`}>
    {getAbbrevMonthWithPeriod(date)} {year}
  </span>;
}
import { resume } from '@/resume';
import { ContestCard } from './ContestCard';
export function ContestList(){
  return (
    <div className="row wrapper">
      {resume.contests.map((contest, i) => <ContestCard contest={contest} key={i}/>)}
    </div>
  );
}
import { resume } from '@/resume';
import { ContestCard } from './ContestCard';
import { RowWrapper } from '../RowWrapper';
export function ContestList(){
  return (
    <RowWrapper>
      {resume.contests
        .sort((a, b) => b.end.getTime() - a.end.getTime())
        .map((contest, i) => <ContestCard contest={contest} key={i}/>)}
    </RowWrapper>
  );
}
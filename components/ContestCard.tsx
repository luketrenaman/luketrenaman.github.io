import { Contest } from "@/resume";
import { ContestAwards } from "./ContestAwards";
import { DateTag } from "./DateTag";

export interface ContestCardProps{
  contest: Contest;
}
export function ContestCard({ contest }:ContestCardProps){
  return(
    <div className="col-3">
      <div className="game-card">
        <p className="text-xl">
          {contest.name}
        </p>
        <DateTag date={contest.start}/>
        {contest.description && <p><i className="fa fa-map-marker-alt"></i>{contest.description}</p>}
        <ContestAwards awards={contest.awards} />
        {contest.link && <a href={contest.link.url}>{contest.link.name}</a>}
      </div>
    </div>
  );
}
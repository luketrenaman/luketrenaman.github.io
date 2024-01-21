import { Contest } from "@/resume";
import { ContestAwards } from "./ContestAwards";
import { DateTag } from "../DateTag";
import { Card } from "../Card";

export interface ContestCardProps{
  contest: Contest;
}
export function ContestCard({ contest }:ContestCardProps){
  return(
    <div className="col-3 mb-4">
      <Card>
        <h3 className="text-xl font-extrabold">
          {contest.name}
        </h3>
        <DateTag date={contest.start}/>
        {contest.description && <p><i className="fa fa-map-marker-alt"></i>{contest.description}</p>}
        <ContestAwards awards={contest.awards} />
        {contest.link && <a href={contest.link.url}>{contest.link.name}</a>}
      </Card>
    </div>
  );
}
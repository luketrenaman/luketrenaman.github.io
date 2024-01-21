import { Contest } from "@/resume";
import { ContestAwards } from "./ContestAwards";
import { DateTag } from "../DateTag";
import { Card } from "../Card";
import { MotionConfig, motion } from "framer-motion";

export interface ContestCardProps{
  contest: Contest;
}
const DURATION = 0.5;

export function ContestCard({ contest }:ContestCardProps){
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
            {contest.name}
          </h3>
          <DateTag date={contest.start}/>
          {contest.description && <p><i className="fa fa-map-marker-alt"></i>{contest.description}</p>}
          <ContestAwards awards={contest.awards} />
          {contest.link && <a href={contest.link.url}>{contest.link.name}</a>}
        </div>
      </Card>
    </motion.div>
  );
}
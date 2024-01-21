import { Contest } from "@/resume";

export interface ContestAwardProps{
  awards: Contest['awards'];
}
export function ContestAwards({awards} : ContestAwardProps){
  return (
    <div>
      {awards.map((award, i) => (
        <p key={i}><i className="fa fa-award"></i> {award}</p>
      ))}
    </div>
  );
}
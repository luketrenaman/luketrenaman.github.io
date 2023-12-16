import { Project } from "@/resume";
import { Tag } from "./Tag";
import { getAbbrevMonth } from "@/util/date";
import { DateTag } from "./DateTag";
import { useEffect, useState } from "react";
export interface ProjectCardProps{
    project: Project;
}
// What if every time a project card scrolled into view it spun around
export function ProjectCard({project}: ProjectCardProps){
  const [rot, setRot] = useState(180);
  console.log(rot);
  useEffect(() => {
    const interval = setInterval(() => {
        setRot((rot + 1) % 360);
    }, 5);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [rot]);
  const rotClass = rot <= 270 ? "rot-hidden" : "";
    return(
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <div className={`game-card ${rotClass}`} style={{transform:`rotateY(${rot}deg)`}}>
          <a href={project.link}><img src={project.thumbnail} /></a>
          <div className="game-blurb">
            <div className="game-title">
              <a href={project.link}>{project.name}</a>
              { project.repo && <a href={project.repo}><i className="fa fa-github right-info"></i></a> }
              { project.platforms.includes("Desktop") && <i className="fa fa-desktop right-info"></i> }
              { project.platforms.includes("Mobile") && <i className="fas fa-mobile-alt right-info"></i> }
            </div>
            <Tag type={project.type}/>
            <DateTag date={project.end} />
            <div className="game-tagline">{project.description}</div>
          </div>
        </div>
      </div>
    );
}
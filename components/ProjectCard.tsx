import { Project } from "@/resume";
import { Tag } from "./Tag";
import { getAbbrevMonth } from "@/util/date";
import { DateTag } from "./DateTag";
export interface ProjectCardProps{
    project: Project;
}
export function ProjectCard({project}: ProjectCardProps){
    return(
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <div className="game-card">
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
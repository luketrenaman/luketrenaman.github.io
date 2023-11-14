import { Project } from "@/resume";
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
              <a href={project.link}>INTERalliance</a>
              { project.repo && <a href={project.repo}><i className="fa fa-github right-info"></i></a> }
              { project.platforms.includes("Desktop") && <i className="fa fa-desktop right-info"></i> }
              { project.platforms.includes("Mobile") && <i className="fas fa-mobile-alt right-info"></i> }
            </div>
            <span className="tag tag-date" title="Finished on Aug 9th, 2022">Aug. 2022</span>
            <div className="game-tagline">{project.description}</div>
          </div>
        </div>
      </div>
    );
}
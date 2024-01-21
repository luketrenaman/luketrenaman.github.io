import { Project } from "@/resume";
import { Tag } from "./Tag";
import { getAbbrevMonth } from "@/util/date";
import { motion } from "framer-motion";
import { DateTag } from "./DateTag";
import { useEffect, useState } from "react";
export interface ProjectCardProps{
    project: Project;
}
const DURATION = 0.5;
// What if every time a project card scrolled into view it spun around
export function ProjectCard({ project }: ProjectCardProps){
  return(
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: DURATION }}
      whileInView={{ opacity: 1 }}
      viewport={{"once":true}}
      className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div
        className="game-card"
      >
        <div className="absolute top-0 right-0">
          { project.repo && <a href={project.repo}><i className="fa fa-github right-info"></i></a> }
          { project.platforms.includes("Desktop") && <i className="fa fa-desktop right-info"></i> }
          { project.platforms.includes("Mobile") && <i className="fas fa-mobile-alt right-info"></i> }
        </div>
        {project.thumbnail && <div>
          <a href={project.link}><img src={project.thumbnail} /></a>
        </div> }
        <div className="game-blurb box-shadow">
          <div className="game-title mb-1">
            <a href={project.link} className="text-xl">{project.name}</a>
          </div>

          <div className="game-tagline">{project.description}</div>
        </div>
      </div>
    </motion.div>
  );
}
import { Project } from "@/resume";
import { Tag } from "./Tag";
import { getAbbrevMonth } from "@/util/date";
import { motion } from "framer-motion";
import { DateTag } from "./DateTag";
import { useEffect, useState } from "react";
export interface ProjectCardProps{
    project: Project;
}
const SPIN = 0.3;
// What if every time a project card scrolled into view it spun around
export function ProjectCard({ project }: ProjectCardProps){
    return(
      <motion.div
      initial={{ rotateX: 180 }}
      transition={{ duration: SPIN }}
      whileInView={{ rotateX: 0 }}
      viewport={{"once":true}}
      className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div
        className="game-card"
        >
          <motion.div
          initial={{ visibility: "hidden" }}
          whileInView={{ visibility: "visible" }}
          viewport={{"once":true}}
          transition={{ delay: SPIN / 3 }}
          >
            <div className="flex gap-4 items-center relative">
              <div className="absolute top-0 right-0">
                  { project.repo && <a href={project.repo}><i className="fa fa-github right-info"></i></a> }
                  { project.platforms.includes("Desktop") && <i className="fa fa-desktop right-info"></i> }
                  { project.platforms.includes("Mobile") && <i className="fas fa-mobile-alt right-info"></i> }
              </div>
              {project.thumbnail && <div>
                <a href={project.link}><img className="w-40" src={project.thumbnail} /></a>
              </div> }
              <div className="game-blurb">
                <div className="game-title">
                  <a href={project.link} className="text-lg">{project.name}</a>
                </div>
                <Tag type={project.type}/>
                <DateTag date={project.end} />
              </div>
            </div>
            <div className="game-tagline">{project.description}</div>

          </motion.div>
        </div>
      </motion.div>
    );
}
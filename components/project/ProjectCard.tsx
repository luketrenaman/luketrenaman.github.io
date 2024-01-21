import { Project } from "@/resume";
import { motion } from "framer-motion";
import { Card } from "../Card";

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
      className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12 mb-4">
      <Card>
        {project.thumbnail && <div>
          <a href={project.link}><img className="w-full aspect-[315/230] object-cover bg-white" src={project.thumbnail} /></a>
        </div> }
        <div className="py-3 px-2.5">
          <h3 className="mb-1">
            <a href={project.link} className="text-xl font-extrabold">{project.name}</a>
            { project.repo && <a href={project.repo}><i className="fa fa-github right-info float-right"></i></a> }
          </h3>
          
          <p className="mt-2">{project.description}</p>
        </div>
      </Card>
    </motion.div>
  );
}
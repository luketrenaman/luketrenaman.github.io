import { resume } from '@/resume';
import { ProjectCard } from '@/components/ProjectCard';
export function ProjectsList(){
  return (
    <div className="row wrapper">
      {resume.projects.map((project,i) => <ProjectCard key={i} project={project}/>)}
    </div>
  );
}
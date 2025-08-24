import { resume } from '@/resume';
import { ProjectCard } from './ProjectCard';
import { RowWrapper } from '../RowWrapper';
export function ProjectsList(){
  return (
    <RowWrapper>
      {resume.projects.map((project,i) => <ProjectCard key={i} project={project}/>)}
    </RowWrapper>
  );
}
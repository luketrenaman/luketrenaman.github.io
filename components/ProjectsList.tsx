import { resume } from '@/resume'
import { ProjectCard } from '@/components/ProjectCard'
import { useEffect } from 'react'
import { useState } from 'react';
export function ProjectsList(){
    const [movement, setMovement] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setMovement(movement + 1), 10);
        return () => clearInterval(interval);
    }, [movement]);
    return resume.projects.map((project,i) => <div key={i} style={{position:"relative", top:movement}}><ProjectCard project={project}/></div>);
}
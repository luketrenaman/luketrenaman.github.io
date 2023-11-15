import Image from 'next/image'
import { Inter } from 'next/font/google'
import { resume } from '@/resume'
import { ProjectCard } from '@/components/ProjectCard'
export default function Home() {
  return (
    <>
      <div>
        <header className="container">
          <p className="header-s1">
            Hello, I&apos;m
          </p>
          <p className="header-s2">Luke Trenaman</p>
          <p className="header-s3">Welcome to my <b>epic</b> website.</p>
        </header>
        <main className="mx-auto">
          <section className="container">
            <div className="row wrapper">
              {resume.projects.map((project,i) => <ProjectCard key={i} project={project}/>)}
            </div>
          </section>
        </main>
      </div>
      <footer>
        <hr className="margin-side-vw" />
      </footer>
    </>
  )
}

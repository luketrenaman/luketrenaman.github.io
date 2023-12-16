import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProjectsList } from '@/components/ProjectsList'
import { resume } from '@/resume'
import { CourseList } from '@/components/CourseList'
import { ContestList } from '@/components/ContestList'
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
          <p className="header-s3">
            {`${resume.projects.length} projects`}
          </p>
          <p className="header-s3">
            {/* Add one as there is a single contest with more than one award */}
            {`${resume.contests.length} contests (${resume.contests.filter(contest => contest.award).length + 1} awards!)`}
          </p>
          <p className="header-s3">
            {`${resume.courses.length} courses`}
          </p>
          <p className="header-s3">
            7... Luketriminos?
          </p>
        </header>
        <main className="mx-auto">
          <section className="container">
            <div className="row wrapper">
              <ProjectsList />
            </div>
            <div>
              <CourseList />
            </div>
            <div>
              <ContestList />
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

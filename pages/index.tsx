import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProjectsList } from '@/components/ProjectsList'
import { resume } from '@/resume'
import { CourseList } from '@/components/CourseList'
import { ContestList } from '@/components/ContestList'
import Head from 'next/head'
export default function Home() {
  return (
    <>
      <Head>
        <title>luketrenaman.com | luke trenaman but website</title>
      </Head>
      <div>
        <header className="container">
          <p className="header-s1">
            Hello, I&apos;m
          </p>
          <p className="header-s2 i-like-blue">Luke Trenaman</p>
          <p className="header-s3">Welcome to my <b>epic</b> website. It has:</p>
          <p className="header-s3">
            {`${resume.projects.length} projects `}
            {`${resume.contests.length} contests (${resume.contests.filter(contest => contest.award).length + 1} awards!) `}
            {`${resume.courses.length} courses `}
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

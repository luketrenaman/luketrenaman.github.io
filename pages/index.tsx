import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProjectsList } from '@/components/ProjectsList'
import { resume } from '@/resume'
import { CourseList } from '@/components/CourseList'
import { ContestList } from '@/components/ContestList'
import { motion } from 'framer-motion'
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
          <motion.p
          initial={{ position: "relative", bottom: 200, right: 200, rotateY: 180, fontFamily: "Arial", rotateX: 180 }}
          animate={{ bottom: 0, right: 0, rotateY: 720, fontFamily: "Comic Sans MS", rotateX: 0 }}
          transition={{ duration: 1.5 }}
          className="header-s2 i-like-blue">Luke Trenaman</motion.p>
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
            <ProjectsList />
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

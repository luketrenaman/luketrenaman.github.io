import Image from 'next/image'
import {Inter} from "next/font/google";
import { ProjectsList } from '@/components/ProjectsList'
import { resume } from '@/resume'
import { CourseList } from '@/components/CourseList'
import { ContestList } from '@/components/ContestList'
import { motion } from 'framer-motion'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>luketrenaman.com | luke trenaman but website</title>
      </Head>
      <div className={inter.className}>
        <header className="container m-52 relative flex flex-col justify-center align-middle">
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:5, height: 5, top:-20, left:-20 }}
            animate={{ width: 80 }}
            transition={{ duration: 2.0 }}
          />
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:5, height: 5, top:-20, left:-20 }}
            animate={{ height: 80 }}
            transition={{ duration: 2.0 }}
          />
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:5, height: 5, bottom:-20, right:-20 }}
            animate={{ width: 80 }}
            transition={{ duration: 2.0 }}
          />
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:5, height: 5, bottom:-20, right:-20 }}
            animate={{ height: 80 }}
            transition={{ duration: 2.0 }}
          />
          <p className="header-s1 text-center">
            Hello, I&apos;m
          </p>
          <motion.p
          initial={{ position: "relative", bottom: 200, left: 800, rotateY: 180 }}
          animate={{ bottom: 0, left: 0, rotateY: 360 }}
          transition={{ duration: 1.5 }}
          className="header-s2 i-like-blue text-center"><b><i>Luke Trenaman</i></b></motion.p>
          <p className="header-s3 text-center">Welcome to my <b style={{color: "#FFC71F"}}>epic</b> website.</p>
          {/* <p className="header-s3">
            {`${resume.projects.length} projects `}
            {`${resume.contests.length} contests (${resume.contests.filter(contest => contest.award).length + 1} awards!) `}
            {`${resume.courses.length} courses `}
            7... Luketriminos?
          </p> */}
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

import {Inter} from "next/font/google";
import { ProjectsList } from '@/components/ProjectsList';
import { CourseList } from '@/components/CourseList';
import { ContestList } from '@/components/ContestList';
import Head from 'next/head';
import { AnimatedHeader } from '@/components/AnimatedHeader';
import { SectionTitle } from "@/components/SectionTitle";
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>luketrenaman.com | luke trenaman but website</title>
      </Head>
      <div className={inter.className}>
        <AnimatedHeader />
        <main>
          <section className="container">
            <SectionTitle title="Projects"/>
            <ProjectsList />
            <SectionTitle title="Courses"/>
            <div>
              <CourseList />
            </div>
            <SectionTitle title="Contests"/>
            <div>
              <ContestList />
            </div>
          </section>
        </main>
      </div>
      <footer className="flex">
        <a href="https://github.com/luketrenaman" title="GitHub"><i className="fa fa-github"></i></a>
        <a href="https://www.linkedin.com/in/luke-trenaman-8854a11a3/" title="LinkedIn"><i className="fa fa-linkedin"></i></a>
        <a href="https://stackoverflow.com/users/17460969/luke-trenaman" title="StackOverflow"><i className="fa fa-stack-overflow"></i></a>
        <a href="https://www.hackerrank.com/profile/trenamanluke" title="HackerRank"><i className="fa fa-hackerrank"></i></a>
      </footer>
    </>
  );
}

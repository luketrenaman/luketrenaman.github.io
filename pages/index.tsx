import {Inter} from "next/font/google";
import { ProjectsList } from '@/components/ProjectsList';
import { CourseList } from '@/components/CourseList';
import { ContestList } from '@/components/ContestList';
import Head from 'next/head';
import { AnimatedHeader } from '@/components/AnimatedHeader';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>luketrenaman.com | luke trenaman but website</title>
      </Head>
      <div className={inter.className}>
        <AnimatedHeader />
        <main className="mx-auto">
          <section className="container pb-4">
            <p>
              Let&apos;s start with the <span style={{color:"#94FBAB"}}><b>projects</b></span>.
            </p>

          </section>
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
        <a href="https://github.com/luketrenaman" title="GitHub"><i className="fa fa-github"></i></a>
        <a href="https://www.linkedin.com/in/luke-trenaman-8854a11a3/" title="LinkedIn"><i className="fa fa-linkedin"></i></a>
        <a href="https://stackoverflow.com/users/17460969/luke-trenaman" title="StackOverflow"><i className="fa fa-stack-overflow"></i></a>
        <a href="https://www.hackerrank.com/profile/trenamanluke" title="HackerRank"><i className="fa fa-hackerrank"></i></a>
      </footer>
    </>
  );
}

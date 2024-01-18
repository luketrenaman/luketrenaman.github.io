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
      </footer>
    </>
  );
}

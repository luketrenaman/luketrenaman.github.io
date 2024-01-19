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
      <footer>
        <hr className="margin-side-vw" />
      </footer>
    </>
  );
}

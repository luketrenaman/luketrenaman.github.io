import {Inter} from "next/font/google";
import { ProjectsList } from '@/components/project/ProjectsList';
import { CourseList } from '@/components/course/CourseList';
import { ContestList } from '@/components/contest/ContestList';
import Head from 'next/head';
import { AnimatedHeader } from '@/components/AnimatedHeader';
import { SectionTitle } from "@/components/SectionTitle";
import { Footer } from "@/components/Footer";
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
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

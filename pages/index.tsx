import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ProjectsList } from '@/components/ProjectsList'
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
              <ProjectsList />
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

import Head from "next/head";

export interface PlayerProps{
  src: string;
  title: string;
}
export function Player({ src, title } : PlayerProps){
  return<>
  <Head><title>{title + " | luketrenaman.com"}</title></Head>
   <iframe className="fixed block bg-white border-0 h-full w-full" src={src}></iframe>
  </>;
}
export interface PlayerProps{
  src: string;
}
export function Player({ src } : PlayerProps){
  return <iframe className="fixed block bg-white border-0 h-[100vh] w-[100vw]" src={src}></iframe>;
}
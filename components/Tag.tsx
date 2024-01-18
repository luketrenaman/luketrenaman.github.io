import { Project } from "@/resume";
export interface TagProps{
    type: Project["type"];
}
export function Tag({ type } : TagProps){
  if(type === "Web"){
    return <span className="tag tag-webpage" title="This project is a website, just like the one you're on now ;)">Website</span>;
  }
  if(type === "Game"){
    return <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>;
  }
  if(type === "Other"){
    return <span className="tag tag-code" title="Something else">Other</span>;
  }
}
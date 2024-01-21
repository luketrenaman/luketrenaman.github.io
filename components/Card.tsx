import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({children}: CardProps){
  return(
    <div className="h-full bg-backgroundComplement shadow-[4px_4px_0px_var(--shadow-color)] text-textComplement">
      {children}
    </div>
  );
}
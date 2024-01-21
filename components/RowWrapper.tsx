import { ReactNode } from "react";

type RowWrapperProps = {
  children: ReactNode;
};

export function RowWrapper({children} : RowWrapperProps){
  return(
    <div className="row flex items-stretch flex-wrap h-auto">
      {children}
    </div>
  );
}
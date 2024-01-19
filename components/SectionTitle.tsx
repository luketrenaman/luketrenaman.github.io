export interface SectionTitleProps{
  title: string;
}
export function SectionTitle({ title }: SectionTitleProps){
  return (
    <div className="pb-4">
      <p className="text-xl" style={{ "width":"104%", "marginLeft":"-2%", "borderBottom": "4px solid #94FBAB", "lineHeight":"0.1em", textAlign:"center" }}>
        <span style={{color:"#94FBAB", backgroundColor: "#60435F", padding: "0 10px"}}><b>{title}</b></span>
      </p>
    </div>
  );
}
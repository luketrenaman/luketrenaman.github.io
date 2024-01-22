import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const horizontal = {
  initial:{
    width:0,
    height: "var(--corner-size)",
  },
  animate:{
    width: "var(--corner-length)",
  },
};
const vertical = {
  initial:{
    width:"var(--corner-size)",
    height: 0,
  },
  animate:{
    height: "var(--corner-length)",
  },
};
const topLeftVariants = {
  initial: {
    top:"var(--corner-start)",
    left:"var(--corner-start)",
  },
  animate: {
    top:"var(--corner-end)",
    left:"var(--corner-end)",
  },
};
const bottomRightVariants = {
  initial: {
    bottom:"-200px",
    right:"-200px",
  },
  animate: {
    bottom:"var(--corner-end)",
    right:"var(--corner-end)",
  },
};
const combine = (a: Variants, b: Variants): Variants => {
  return {
    initial:{
      ...a.initial,
      ...b.initial,
    },
    animate:{
      ...a.animate,
      ...b.animate,
    }
  };
};
export function AnimatedHeader(){
  // variantArr contains objects with each combination between horizontal/vertical and topLeftVariants / bottomRightVariants
  // each one has an initial and animate nested object, account for this

  const variantArr = [
    combine(horizontal, topLeftVariants),
    combine(vertical, topLeftVariants),
    combine(horizontal, bottomRightVariants),
    combine(vertical, bottomRightVariants),
  ];
  console.log(variantArr);
  return (
    <header className="my-52 mx-auto">
      <div className="text-center text-lg text-textAccent">
        Hello, I&apos;m
      </div>
      <motion.div
        initial={{ position: "relative", bottom: 0, right: 800, scale: 0.2, rotateZ:270 }}
        animate={{ bottom: 0, left: 0, scale: 1, rotateZ:360 }}
        transition={{ duration: 1.5 }}
        className="text-center">
        <span className="relative text-textPrimary text-6xl font-bold">
          {variantArr.map((variant,i) => <motion.div 
            key={i}
            className="absolute bg-textAccent"
            initial="initial"
            animate="animate"
            transition={{ duration:20, delay:1.5 }}
            variants={variant}
          />)}
          Luke Trenaman
        </span>
      </motion.div>
      <div className="text-lg text-center text-textAccent">
        Welcome to my <motion.b
          initial={{ display:"none", opacity:0}}
          animate={{ display: "inline", opacity:1}}
          transition={{ duration: 1.0, delay: 2.5}}
          className="text-textPrimary">
          epic
        </motion.b> website.</div>
    </header>
  );
}
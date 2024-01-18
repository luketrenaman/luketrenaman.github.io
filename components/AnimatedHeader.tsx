import { motion } from "framer-motion";

export function AnimatedHeader(){
  return (
    <header className="my-52 mx-auto">
      <div className="text-center text-lg">
        Hello, I&apos;m
      </div>
      <motion.div
        initial={{ position: "relative", bottom: 200, left: 800, scale: 0.2 }}
        animate={{ bottom: 0, left: 0, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="i-like-blue text-center text-6xl font-light">
        <span className="relative">
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:0, height: 5, top:-200, left:-200, rotateZ: 90 }}
            animate={{ width: 35, rotateZ:0, top:-50, left: -50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:5, height: 0, top:-200, left:-200, rotateZ: -90 }}
            animate={{ height: 35, rotateZ:0, top:-50, left:-50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:0, height: 5, bottom:-200, right:-200, rotateZ: 90 }}
            animate={{ width: 35, rotateZ:0, bottom: -50, right: -50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          <motion.div
            initial={{ position: "absolute", backgroundColor: "#94FBAB", width:5, height: 0, bottom:-200, right:-200, rotateZ: -90 }}
            animate={{ height: 35, rotateZ:0, bottom: -50, right: -50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          Luke Trenaman
        </span>
      </motion.div>
      <div className="text-lg text-center">
        Welcome to my
        <motion.b
          initial={{ display:"none", opacity:0}}
          animate={{ display: "inline", opacity:1}}
          transition={{ duration: 1.0, delay: 2.5}}
          style={{color: "#94FBAB"}}>
          epic
        </motion.b>
        website.</div>
    </header>
  );
}
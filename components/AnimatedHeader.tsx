import { motion } from "framer-motion";

export function AnimatedHeader(){
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
          <motion.div
            className="absolute bg-[#CEF6C6]"
            initial={{ width:0, height: 4, top:-200, left:-200 }}
            animate={{ width: 35, top:-50, left: -50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          <motion.div
            className="absolute bg-[#CEF6C6]"
            initial={{ width:4, height: 0, top:-200, left:-200 }}
            animate={{ height: 35, top:-50, left:-50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          <motion.div
            className="absolute bg-[#CEF6C6]"
            initial={{ width:0, height: 4, bottom:-200, right:-200 }}
            animate={{ width: 35, bottom: -50, right: -50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
          <motion.div
            className="absolute bg-[#CEF6C6]"
            initial={{ width:4, height: 0, bottom:-200, right:-200 }}
            animate={{ height: 35, bottom: -50, right: -50 }}
            transition={{ duration: 0.7, delay:1.5 }}
          />
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
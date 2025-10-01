import { motion } from "framer-motion";

function FancyLoader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#c8dcfc] to-[#e7f0ff]">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated glowing dots */}
        <div className="flex space-x-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-4 h-4 rounded-full bg-[#75aaff] shadow-lg shadow-blue-500/50"
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FancyLoader;

export default function CirclesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main circles with enhanced modern effects */}
      <div className="circle-lg absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-soraia-primary/15 animate-float blur-2xl"></div>
      <div className="circle-md absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-soraia-accent/10 animate-float-delay blur-2xl"></div>
      <div className="circle-sm absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-soraia-secondary/15 animate-float-reverse blur-xl"></div>
      <div className="circle-xs absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-soraia-primary/20 animate-float-slow blur-xl"></div>

      {/* Glowing effect elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/6 bg-soraia-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/6 bg-soraia-secondary/10 rounded-full blur-3xl"></div>
    </div>
  );
}
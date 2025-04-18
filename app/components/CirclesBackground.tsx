export default function CirclesBackground() {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="circle-lg absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-soraia-accent/20 animate-float"></div>
        <div className="circle-md absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-soraia-primary/10 animate-float-delay"></div>
        <div className="circle-sm absolute top-2/3 left-1/3 w-32 h-32 rounded-full bg-soraia-secondary/15 animate-float-reverse"></div>
        <div className="circle-xs absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-soraia-accent/25 animate-float-slow"></div>
      </div>
    );
  }
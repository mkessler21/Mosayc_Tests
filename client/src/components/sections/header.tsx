import { Link } from "wouter";

export default function Header() {
  return (
    <header className="border-b backdrop-blur-sm bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg 
              viewBox="0 0 24 24" 
              className="h-10 w-10 text-primary group-hover:scale-105 transition-transform"
              fill="currentColor"
            >
              <path d="M12 2L2 19h20L12 2zm0 4l7 12H5l7-12z"/>
            </svg>
            <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Mosayc.ai
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              href="#features" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Features
            </a>
            <a 
              href="#waitlist" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

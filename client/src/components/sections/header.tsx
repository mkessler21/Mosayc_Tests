import { Link } from "wouter";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Mosayc.ai Logo" 
              className="h-10 w-10"
            />
            <img 
              src="/logo.png" 
              alt="Mosayc.ai Logo"
              className="h-10"
            />
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

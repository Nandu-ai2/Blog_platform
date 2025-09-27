import { PenTool, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <PenTool className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">BlogForge</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A modern blog platform for creators who value beautiful design and powerful functionality.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.preventDefault(); console.log("GitHub clicked"); }}
                data-testid="link-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.preventDefault(); console.log("Twitter clicked"); }}
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.preventDefault(); console.log("LinkedIn clicked"); }}
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.preventDefault(); console.log("Email clicked"); }}
                data-testid="link-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/web-development" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/career" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest posts and updates.
            </p>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                console.log("Newsletter subscription triggered"); 
              }}
              className="space-y-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                data-testid="input-newsletter-email"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover-elevate transition-all"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} BlogForge. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
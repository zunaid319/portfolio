export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-black">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-500 text-sm font-medium">
          © {new Date().getFullYear()} Creator Portfolio. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm font-medium text-neutral-500">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

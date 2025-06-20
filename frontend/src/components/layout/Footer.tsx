export default function Footer() {
  return (
    <footer className="flex justify-center gap-2 py-6 w-full items-center px-4 md:px-6 border-t border-purple-500/30 bg-black/40">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Round Strike. All rights reserved.
      </p>
    </footer>
  );
}

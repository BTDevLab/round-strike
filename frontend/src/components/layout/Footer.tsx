export default function Footer() {
  return (
    <footer className="flex justify-center gap-2 py-6 w-full items-center px-4 md:px-6 border-t border-yellow-700/30 bg-black/40 bg-gradient-to-t from-[#5b3a1b] via-[#8d5524] to-[#c68642]">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} Round Strike. All rights reserved.
      </p>
    </footer>
  );
}

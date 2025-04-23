import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#0C0C0C] to-[#171717] py-[170px] px-10">
      <Header />
      {children}
    </div>
  );
}

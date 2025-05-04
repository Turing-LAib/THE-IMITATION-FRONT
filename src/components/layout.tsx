import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-linear-to-r from-[#0C0C0C] to-[#171717] pt-[120px] pb-10 px-10 ">
      <div className="max-w-[1600px] m-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}

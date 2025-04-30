import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-[#010101] pt-[170px] pb-10 px-10 ">
      <div className="max-w-[1440px] m-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}

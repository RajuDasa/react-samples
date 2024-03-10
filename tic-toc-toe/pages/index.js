import Main from "./main";

export default function Home() {
  return (
    <main className="min-h-screen bg-indigo-50">
      <div
        className={`relative top-12
        border border-gray-600 shadow-lg mx-auto md:w-[500px] p-12 md:p-24`}
      >
        <Main />
      </div>
    </main>
  );
}

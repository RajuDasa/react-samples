import { Inter } from "next/font/google";
import App from "./app/app";

const inter = Inter({ subsets: ["latin"], weight: ['500', '400'] });

//min-h-screen justify-between
export default function HomeA() {
  return (
    <div className="min-h-screen bg-indigo-50">
      <div
        className={`flex flex-col relative top-12 items-center 
      border border-gray-600 shadow-lg mx-auto md:w-[500px] p-12 md:p-24 ${inter.className}`}
      >
        <div className="items-center justify-between">
          <App />
        </div>
      </div>
    </div>
  );
}

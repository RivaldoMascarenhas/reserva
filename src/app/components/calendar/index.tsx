import { getServerSession } from "next-auth";
import { App } from "./components/calendar/calendar";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { HeadCalendar } from "./components/head/headCalendar";
import { Sidebar } from "./components/sidebar/sidebar";
import "./style.css";

export default async function Calendar() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="Container">
      <Sidebar />
      <div className="Content">
        <HeadCalendar />
        <App />
      </div>
    </main>
  );
}

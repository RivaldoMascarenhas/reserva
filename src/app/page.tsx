import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { App } from "./components/calendar/calendar";
import { HeadCalendar } from "./components/head/headCalendar";
import { Sidebar } from "./components/sidebar/sidebar";
import "./styles.css";

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

import { HeadCalendar } from "./components/head/headCalendar";
import { Sidebar } from "./components/sidebar/sidebar";
import { App } from "./components/calendar/calendar";
import "./style.css";

export default function Calendar() {
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

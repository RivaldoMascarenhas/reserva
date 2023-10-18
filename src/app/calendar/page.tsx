import { App } from "./components/calendar/calendar";
import { Sidebar } from "./components/sidebar/sidebar";
import "./style.css";

export default function Calendar() {
  return (
    <main className="Container">
      <Sidebar />
      <div>
        <App></App>
      </div>
    </main>
  );
}

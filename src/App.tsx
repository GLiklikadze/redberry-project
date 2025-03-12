import { lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import RootLayout from "@/components/layout/RootLayout";
const TasksPage = lazy(() => import("@/pages/tasks/TasksPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<TasksPage />} />
      </Route>
    </Routes>
  );
}

export default App;

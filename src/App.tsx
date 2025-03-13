import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import RootLayout from "@/components/layout/RootLayout";
import { Spinner } from "@/components/ui/loading/LoadingSpinner";
import CreatePage from "@/pages/create-task/CreatePage";
const TasksPage = lazy(() => import("@/pages/tasks/TasksPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner size="large" />}>
              <TasksPage />
            </Suspense>
          }
        />
        <Route
          path="create-task"
          element={
            <Suspense fallback={<Spinner size="large" />}>
              <CreatePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

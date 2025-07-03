import { Route, Routes } from "react-router-dom";
import LogsPage from "../page/LogsPage";
import PageNotFound from "../common/ui/PageNotFound";

const LogRouter = () => {
  return (

    <Routes>

        <Route path="/" element={<LogsPage/>} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}

export default LogRouter
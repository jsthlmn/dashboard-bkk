import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style/style.css";
import MainPage from "./view/MainPage";
import LokerList from "./component/LokerList";
import AddLoker from "./component/AddLoker";
import EditLoker from "./component/EditLoker";
import PesertaList from "./component/PesertaList";
import AddPeserta from "./component/AddPeserta";
import EditPeserta from "./component/EditPeserta";
import Login from "./component/Login";
import Register from "./component/Register";
import DashboardUser from "./component/DashboardUser";
import DashboardAdmin from "./component/DashboardAdmin";
import DetailLoker from "./component/DetailLoker";
import LamaranLoker from "./component/LamaranLoker";
import DetailLamaran from "./component/DetailLamaran";
import AplyLoker from "./component/AplyLoker";
import RekapHarian from "./component/RekapHarian";

function App() {
  return (
    <Router>
      <div>
        <div>
          <div>
            <Switch>

              <Route exact path="/">
                <MainPage />
              </Route>

              <Route path="/loker">
                <LokerList />
              </Route>

              <Route path="/addLoker">
                <AddLoker />
              </Route>

              <Route path="/edit-loker/:id">
                <EditLoker />
              </Route>

              <Route path="/detail-loker/:id">
                <DetailLoker />
              </Route>

            </Switch>
            
            <Switch>
              <Route path="/lamaran-loker">
                  <LamaranLoker />
              </Route>

              <Route path="/detail-lamaran/loker/:id">
                  <DetailLamaran />
              </Route>

            </Switch>

            <Switch>
              <Route path="/peserta">
                <PesertaList />
              </Route>

              <Route path="/addPeserta">
                <AddPeserta />
              </Route>

              <Route path="/aplyLoker/:id">
                <AplyLoker />
              </Route>

              <Route path="/edit-peserta/:id">
                <EditPeserta />
              </Route>

            </Switch>

            <Switch>
              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

            </Switch>

            <Switch>
              <Route path="/dashboard">
                <DashboardAdmin />
              </Route>

              <Route path="/dashboard-user">
                <DashboardUser />
              </Route>

            </Switch>

            <Switch>
              <Route path="/rekap-harian">
                <RekapHarian />
              </Route>

              <Route path="/dashboard-user">
                <DashboardUser />
              </Route>

            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

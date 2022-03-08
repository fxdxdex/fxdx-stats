import React from 'react';
import {
  yaxisFormatterNumber,
  tooltipLabelFormatterUnits,
  tooltipFormatterNumber,
} from './helpers'
import './Home.css';

import VolumeChart from './components/charts/VolumeChart'
import FeesChart from './components/charts/FeesChart'
import GenericChart from './components/GenericChart'
import TotalVolumeCard from "./components/cards/TotalVolumeCard";
import TotalFeesCard from "./components/cards/TotalFeesCard";
import TotalUsersCard from "./components/cards/TotalUsersCard";
import UsersChart from "./components/charts/UsersChart";

function Bsc() {

  return (
    <div className="Home container">
      <h1 className="my-3">Analytics / Binance Smart Contract</h1>

      <div className="row">
        <div className="col-lg-4">
          <TotalVolumeCard />
        </div>
        <div className="col-lg-4">
          <TotalFeesCard />
        </div>
        <div className="col-lg-4">
          <TotalUsersCard />
        </div>

      </div>
      <div className="col-12">
        <div className="my-3">
          <VolumeChart />
        </div>
        <div className="my-3">
          <FeesChart />
        </div>
        <div className="my-3">
          <UsersChart />
        </div>
      </div>
    </div>
  );
}

export default Bsc;

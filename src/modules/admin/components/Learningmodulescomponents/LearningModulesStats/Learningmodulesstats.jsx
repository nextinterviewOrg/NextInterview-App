import React, { useEffect, useState } from "react";
import {
  Header,
  Stats,
  StatCard,
  StatCard1,
  StatCard2,
} from "./Learningmodulesstats.styles";
import { getModule, getModuleByModuleCode } from "../../../../../api/addNewModuleApi";
import { getModuleProgress } from "../../../../../api/moduleProgressApi";

const LearningModulesStats = () => {
  const [totalModules, setTotalModules] = useState(0);
  const [averageCompletionRate, setAverageCompletionRate] = useState(0);
  const [mostViewdModule, setMostViewdModule] = useState({});
  const [leastViewdModule, setLeastViewdModule] = useState({});
  useEffect(() => {
    const apiCaller = async () => {
      const moduleData = await getModule();
      setTotalModules(moduleData.data.length);
      const moduleProgress = await getModuleProgress();
      console.log("moduleProgress", moduleProgress);
      setAverageCompletionRate(moduleProgress.AllmoduleAverageCompletion);
      if (moduleProgress.MostviewedModuleCode) {
        const MostModule = await getModuleByModuleCode(moduleProgress.MostviewedModuleCode);
        console.log("MostModule", MostModule);
        setMostViewdModule({
          title: MostModule.data.moduleName,
          views: moduleProgress.Mostviews
        })

      }
      if (moduleProgress.LeastviewedModuleCode && moduleProgress.MostviewedModuleCode !== moduleProgress.LeastviewedModuleCode) {
        const LeastModule = await getModuleByModuleCode(moduleProgress.LeastviewedModuleCode);
        setLeastViewdModule({
          title: LeastModule.data.moduleName,
          views: moduleProgress.Leastviews
        })
      }
    }
    apiCaller();

  }, [])
  return (
    <Header>
      <div>
        <div
          style={{
            background: "#f5f5f5",
            padding: "0 20px ",
            borderRadius: "8px",
          }}
        >
          <Stats>
            <StatCard>
              <p>Total Topics Published</p>
              <h1>{totalModules}</h1>
            </StatCard>
            <hr style={{ height: "80px", margin: "20px 0 0 0" }} />
            <StatCard>
              <p>Avg. Completion Rate</p>
              <h1>{averageCompletionRate}%</h1>
            </StatCard>
            <hr style={{ height: "80px", margin: "20px 0 0 0" }} />
            <StatCard>
              <p>Avg. Quiz Score</p>
              <h1>0%</h1>
            </StatCard>
          </Stats>
        </div>

        <div style={{ background: "#fff", borderRadius: "8px" }}>
          {mostViewdModule &&
            <StatCard1>
              <p>Most Viewed</p>
              <div className="datascience">{mostViewdModule.title}</div>
              <div>
                <strong> - ({mostViewdModule.views} views)</strong>
              </div>
            </StatCard1>}
          <hr style={{ width: "95%" }} />
          {
            leastViewdModule &&
            <StatCard2>
              <p>Least Viewed</p>
              <div className="datascience">{leastViewdModule.title}</div>
              <div>
                {" "}
                <strong> - ({leastViewdModule.views} views)</strong>
              </div>
            </StatCard2>}
        </div>
      </div>
    </Header>
  );
};

export default LearningModulesStats;

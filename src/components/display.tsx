import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { useStore } from "../store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeFork, faEye, faStar } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="text-center opacity-50">
      <div className="spinner-grow small" role="status"></div>
    </div>
  );
};

export const RepositoryDisplay = () => {
  const { state, repo } = useStore();

  if (!repo || state === "fetching") {
    return <Loading />;
  }

  return (
    <>
      {/* Basic Info */}
      <section className="py-2">
        <div className="d-flex align-items-center">
          <img
            src={repo.thumbnail}
            width="32"
            height="32"
            className="border me-2"
          />
          <h2 className="fw-bold flex-grow-1">{repo.name}</h2>

          <a
            href={repo.url}
            target="_blank"
            className="btn btn-outline-light border-0"
          >
            <FontAwesomeIcon icon={faGithub} className="me-1" />
            See code
          </a>
        </div>
      </section>

      {/* Summary */}
      <section className="row mb-4">
        <div className="col-md">
          <div className="card">
            <div className="card-body fw-bold d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faStar} /> {repo.stars} stars
            </div>
          </div>
        </div>
        <div className="col-md">
          <div className="card">
            <div className="card-body fw-bold d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faCodeFork} /> {repo.forks} forks
            </div>
          </div>
        </div>
        <div className="col-md">
          <div className="card">
            <div className="card-body fw-bold d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faEye} /> {repo.watches} watches
            </div>
          </div>
        </div>
      </section>

      {/* Graphs */}
      <section className="row gap-3">
        <div className="col-md">
          <h4 className="text-center">Last 4 Weeks</h4>
          <LineChart
            dataset={repo.commits}
            xAxis={[
              {
                scaleType: "point",
                dataKey: "day",
                label: "Day",
              },
            ]}
            series={[
              {
                dataKey: "count",
                label: "Commits",
              },
            ]}
            height={300}
            sx={{
              "& .MuiChartsAxis-root text": {
                fill: "#fff",
              },
              "& .MuiChartsLegend-root text": {
                fill: "#fff",
              },
              "& .MuiChartsTooltip-root": {
                color: "#fff",
              },
              "& span.MuiChartsLabel-root": {
                color: "#fff",
              },
              "& .MuiChartsAxis-root line": {
                stroke: "#fff",
              },
            }}
          />
        </div>

        <div className="col-md">
          <h4 className="text-center">Languages</h4>
          <PieChart
            series={[
              {
                data: repo.languages,
              },
            ]}
            height={300}
            sx={{
              "& .MuiChartsAxis-root text": {
                fill: "#fff",
              },
              "& .MuiChartsLegend-root text": {
                fill: "#fff",
              },
              "& .MuiChartsTooltip-root": {
                color: "#fff",
              },
              "& span.MuiChartsLabel-root": {
                color: "#fff",
              },
              "& .MuiChartsAxis-root line": {
                stroke: "#fff",
              },
              "& .MuiChartsLegend-root": {
                maxHeight: "350px",
                overflow: "hidden",
              },
            }}
          />
        </div>
      </section>
    </>
  );
};

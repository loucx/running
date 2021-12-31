import React from 'react';
import { MAIN_COLOR } from 'src/utils/const';
import { formatPace, titleForRun, formatRunTime, formatAvgPace, formatShowTime, convertToSecond} from 'src/utils/utils';
import styles from './style.module.scss';

const RunRow = ({ runs, run, locateActivity, runIndex, setRunIndex }) => {
  const distance = (run.distance / 1000.0).toFixed(1);
  // const pace = run.average_speed;
  // const paceParts = pace ? formatPace(pace) : null;
  // const runTime = formatRunTime(distance, pace);

  const pace = run.average_pace ? formatAvgPace(run.average_pace) : 'None';
  const heartRate = run.average_heartrate;
  const step = run.total_step ? Math.floor(run.total_step / (convertToSecond(run.moving_time)  / 60)) : 'None';
  const runTime = formatRunTime(distance, run.average_pace);
  const totalTime = formatShowTime(run.moving_time);
  const temperature = run.temperature ? Math.floor(run.temperature) + '°' : 'None';
  const title = `【${titleForRun(run)}】${run.name}`;

  // change click color
  const handleClick = (e, runs, run) => {
    const elementIndex = runs.indexOf(run);
    e.target.parentElement.style.color = 'red';

    const elements = document.getElementsByClassName(styles.runRow);
    if (runIndex !== -1 && elementIndex !== runIndex) {
      elements[runIndex].style.color = MAIN_COLOR;
    }
    setRunIndex(elementIndex);
  };

  return (
    <tr
      className={styles.runRow}
      key={run.start_date_local}
      onClick={(e) => {
        handleClick(e, runs, run);
        locateActivity(run);
      }}
    >
      <td>{title}</td>
      <td>{distance}</td>
      <td>{pace}</td>
      <td>{heartRate && heartRate.toFixed(0)}</td>
      <td>{step}</td>
      <td>{temperature}</td>
      <td>{runTime}</td>
      <td>{totalTime}</td>
      <td className={styles.runDate}>{run.start_date_local}</td>
    </tr>
  );
};

export default RunRow;

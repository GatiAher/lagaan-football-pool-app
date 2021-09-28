import React from "react";
import ARI from "../../assets/nfl-logos/ARI.png";
import ATL from "../../assets/nfl-logos/ATL.png";
import BAL from "../../assets/nfl-logos/BAL.png";
import BUF from "../../assets/nfl-logos/BUF.png";
import CAR from "../../assets/nfl-logos/CAR.png";
import CHI from "../../assets/nfl-logos/CHI.png";
import CIN from "../../assets/nfl-logos/CIN.png";
import CLE from "../../assets/nfl-logos/CLE.png";
import DAL from "../../assets/nfl-logos/DAL.png";
import DEN from "../../assets/nfl-logos/DEN.png";
import DET from "../../assets/nfl-logos/DET.png";
import GB from "../../assets/nfl-logos/GB.png";
import HOU from "../../assets/nfl-logos/HOU.png";
import IND from "../../assets/nfl-logos/IND.png";
import JAX from "../../assets/nfl-logos/JAX.png";
import KC from "../../assets/nfl-logos/KC.png";
import LAC from "../../assets/nfl-logos/LAC.png";
import LAR from "../../assets/nfl-logos/LAR.png";
import LV from "../../assets/nfl-logos/LV.png";
import MIA from "../../assets/nfl-logos/MIA.png";
import MIN from "../../assets/nfl-logos/MIN.png";
import NE from "../../assets/nfl-logos/NE.png";
import NO from "../../assets/nfl-logos/NO.png";
import NYG from "../../assets/nfl-logos/NYG.png";
import NYJ from "../../assets/nfl-logos/NYJ.png";
import PHI from "../../assets/nfl-logos/PHI.png";
import PIT from "../../assets/nfl-logos/PIT.png";
import SEA from "../../assets/nfl-logos/SEA.png";
import SF from "../../assets/nfl-logos/SF.png";
import TB from "../../assets/nfl-logos/TB.png";
import TEN from "../../assets/nfl-logos/TEN.png";
import WAS from "../../assets/nfl-logos/WAS.png";
import BYE from "../../assets/nfl-logos/BYE.png";

const teamToLogoMap = new Map([
  ["ARI", ARI],
  ["ATL", ATL],
  ["BAL", BAL],
  ["BUF", BUF],
  ["CAR", CAR],
  ["CHI", CHI],
  ["CIN", CIN],
  ["CLE", CLE],
  ["DAL", DAL],
  ["DEN", DEN],
  ["DET", DET],
  ["GB", GB],
  ["HOU", HOU],
  ["IND", IND],
  ["JAX", JAX],
  ["KC", KC],
  ["LAC", LAC],
  ["LAR", LAR],
  ["LV", LV],
  ["MIA", MIA],
  ["MIN", MIN],
  ["NE", NE],
  ["NO", NO],
  ["NYG", NYG],
  ["NYJ", NYJ],
  ["PHI", PHI],
  ["PIT", PIT],
  ["SEA", SEA],
  ["SF", SF],
  ["TB", TB],
  ["TEN", TEN],
  ["WAS", WAS],
]);

const TeamLogo = ({ team }: { team: string | undefined }) => {
  let alt = "BYE";
  let src = BYE;
  if (team && team !== "BYE1" && team !== "BYE2" && team !== "BYE3" && team !== "BYE4") {
    alt = team;
    // @ts-ignore
    src = teamToLogoMap.get(team);
  }
  return (
    <img
      style={{
        height: "40px",
        width: "40px",
      }}
      src={src}
      alt={alt}
    />
  );
};

export default TeamLogo;

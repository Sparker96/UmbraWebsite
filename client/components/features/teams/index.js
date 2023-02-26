import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTeams, fetchRaidersAsync } from "./teamsSlice";

const Teams = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRaidersAsync());
  }, [dispatch]);

  const teams = useSelector(selectTeams);

  //   function sortLevelAscending(members) {
  //     return [...members].sort((a, b) => a.level - b.level);
  //   }

  //   function sortLevelDescending(members) {
  //     return [...members].sort((a, b) => b.level - a.level);
  //   }

  function sortRoleTankFirst(raiders) {
    let sortedRaiders = [...raiders].sort((a, b) => {
      let aVal = 0;
      let bVal = 0;
      if (a.role === "Tank") {
        aVal = 3;
      }
      if (a.role === "Healer") {
        aVal = 2;
      }
      if (a.role === "Dps") {
        aVal = 1;
      }
      if (b.role === "Tank") {
        bVal = 3;
      }
      if (b.role === "Healer") {
        bVal = 2;
      }
      if (b.role === "Dps") {
        bVal = 1;
      }
      return bVal - aVal;
    });
    return sortedRaiders;
  }

  function roleCheckerColor(role) {
    if (role === "Tank") {
      return "#050444";
    }
    if (role === "Healer") {
      return "#044404";
    }
    if (role === "Dps") {
      return "#44041E";
    }
  }
  

  // function sortGuildRankDescending(raiders) {
  //   let sortedRaiders = [...raiders].sort(
  //     (a, b) => a.guildRankId - b.guildRankId
  //   );
  //   return sortedRaiders;
  // }

  console.log(teams);

  return (
    <>
      {teams.main == null ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="mainRaidersHeader">
            Main Raid Team {`(${teams.main.length})`}
          </h1>
          <div className="mainRaiders">
            {sortRoleTankFirst(teams.main).map((raider) => {
              return (
                <Link to={`/member/${raider.name}`}>
                  <div
                    className="raiderSummary"
                    key={raider.id}
                    style={{ backgroundColor: roleCheckerColor(raider.role) }}
                  >
                    <div id="raiderAvatar">
                      <img src={raider.avatarMedia} />
                    </div>
                    <div id="raiderDetails">
                      <ul>
                        <li>
                          {raider.name} {`(${raider.role})`}
                        </li>
                        <li style={{ color: `${raider.classColor}` }}>
                          {raider.spec} {raider.class}
                        </li>
                        <li style={{ color: `${raider.itemLevelColor}` }}>
                          iLvl: {raider.itemLevel}
                        </li>
                        <li style={{ color: `${raider.mythicPlusColor}` }}>
                          M+ Score: {raider.mythicPlusScore}
                        </li>
                      </ul>
                    </div>
                    <div id="raiderFooter"> {raider.guildRank} </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Teams;

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

  function sortGuildRankDescending(raiders) {
    let sortedRaidersByRankD = [...raiders].sort(
      (a, b) => a.guildRankId - b.guildRankId
    );
    return sortedRaidersByRankD;
  }

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
            {sortGuildRankDescending(teams.main).map((raider) => {
              return (
                <Link to={`/member/${raider.name}`}>
                  <div className="raiderSummary" key={raider.id}>
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
                        <li>
                          M+ Score: {raider.mythicPlusScore}
                        </li>
                        <li>
                          {raider.guildRank}
                        </li>
                      </ul>
                    </div>
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMembers,
  fetchMembersAsync,
  sortGuildRankDescending,
  sortGuildRankAscending,
  sortLevelAscending,
  sortLevelDescending,
  sortClassAscending,
  sortClassDescending,
  sortItemLevelAscending,
  sortItemLevelDescending,
  sortNameAscending,
  sortNameDescending,
} from "./membersSlice";

const Members = () => {
  const [sortedBy, setSortedBy] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const members = useSelector(selectMembers);

  const sortByItemLevel = function (sortedBy) {
    if (sortedBy === "itemLevelDescending") {
      setSortedBy("itemLevelAscending");
      dispatch(sortItemLevelAscending());
    } else {
      setSortedBy("itemLevelDescending");
      dispatch(sortItemLevelDescending());
    }
  };

  const sortByName = function (sortedBy) {
    if (sortedBy === "nameDescending") {
      setSortedBy("nameAscending");
      dispatch(sortNameAscending());
    } else {
      setSortedBy("nameDescending");
      dispatch(sortNameDescending());
    }
  };

  const sortByGuildRank = function (sortedBy) {
    if (sortedBy === "guildDescending") {
      setSortedBy("guildAscending");
      dispatch(sortGuildRankAscending());
    } else {
      setSortedBy("guildDescending");
      dispatch(sortGuildRankDescending());
    }
  };

  const sortByLevel = function (sortedBy) {
    if (sortedBy === "levelDescending") {
      setSortedBy("levelAscending");
      dispatch(sortLevelAscending());
    } else {
      setSortedBy("levelDescending");
      dispatch(sortLevelDescending());
    }
  };

  const sortByClass = function (sortedBy) {
    if (sortedBy === "classDescending") {
      setSortedBy("classAscending");
      dispatch(sortClassAscending());
    } else {
      setSortedBy("classDescending");
      dispatch(sortClassDescending());
    }
  };

  return (
    <>
      {!members == null ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="membersHeader">Members</h1>
          <table className="membersTable">
            <tr>
              <th onClick={() => sortByName(sortedBy)}>Name</th>
              <th onClick={() => sortByClass(sortedBy)}>Class</th>
              <th onClick={() => sortByLevel(sortedBy)}>Level</th>
              <th onClick={() => sortByItemLevel(sortedBy)}>Item Level</th>
              <th onClick={() => sortByGuildRank(sortedBy)}>Guild Rank</th>
            </tr>
            {members.map((member) => {
              return (
                <tr key={member.id}>
                  <td>
                    <Link to={`/member/${member.name}`}>{member.name}</Link>
                  </td>
                  <td style={{ color: `${member.classColor}` }}>
                    {member.class}
                  </td>
                  <td>{member.level}</td>
                  <td style={{ color: `${member.itemLevelColor}` }}>
                    {member.itemLevel}
                  </td>
                  <td>{member.guildRank}</td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </>
  );
};

export default Members;

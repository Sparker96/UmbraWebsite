import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMembers, fetchMembersAsync } from "./membersSlice";

const Members = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembersAsync());
  }, [dispatch]);

  const members = useSelector(selectMembers);

  function sortLevelAscending(members) {
    return [...members].sort((a, b) => a.level - b.level);
  }

  function sortLevelDescending(members) {
    return [...members].sort((a, b) => b.level - a.level);
  }

  function sortGuildRankDescending(members) {
    let sortedMembersByRankD = [...members].sort((a, b) => a.guildRankId - b.guildRankId);
    console.log(sortedMembersByRankD)
    return sortedMembersByRankD;
  }

  return (
    <>
      {!members == null ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="membersHeader">Members</h1>
          <table className="membersTable">
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Class Id</th>
            </tr>
            {sortGuildRankDescending(members).map((member) => {
              return (
                <tr key={member.id}>
                  <td>
                    <Link to={`/member/${member.name}`}>{member.name}</Link>
                  </td>
                  <td>{member.level}</td>
                  <td>{member.class}</td>
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

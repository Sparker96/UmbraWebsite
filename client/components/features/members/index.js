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

  console.log(members);

  function sortLevelAscending(members) {
  return [...members].sort((a,b) => a.character.level - b.character.level)
  }

  function sortLevelDescending(members) {
    return [...members].sort((a,b) => b.character.level - a.character.level)
    }

    function sortGuildRankDescending(members) {
      return [...members].sort((a,b) => a.rank - b.rank)
      }
  
  return (
    <>
      {!members==null ? (
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
              <tr key={member.character.id}>
                <td><Link to={`/member/${member.character.name}`}>{member.character.name}</Link></td>
                <td>{member.character.level}</td>
                <td>{member.character.playable_class.id}</td>
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

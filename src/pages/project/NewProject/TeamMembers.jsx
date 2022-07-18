// import ClearIcon from "@mui/icons-material/Clear";
// import { Avatar, Grid } from "@mui/material";
// import * as _ from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// // import MemberService from "services/MemberService";
// import { PAGE_URLS } from "../../../constants/common";
// import MemberDropdownItem from "./MemberDropdownItem";
// import { getAllUser } from "../../../redux/action/userAction";
// import "./TeamMembers.scss";
// const TeamMembers = ({
//   userId,
//   handleTeam,
//   handleTeamByIdAndIsPM,
//   editTeam,
// }) => {
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.user);
//   const params = useParams();
//   const { editProjectId } = params;
//   const isAddMore = !editProjectId;
//   const [members, setMembers] = useState([]);
//   const [memberByIdAndIsPM, setMemberByIdAndIsPM] = useState([]);
//   const [memberActive, setMemberActive] = useState(false);
//   const [memberAllActive, setMemberAllActive] = useState(false);

//   // const [memberData, setMemberData] = useState(userState.users);
//   const memberData = userState.users;
//   // const memberData = [
//   //   {
//   //     active: true,
//   //     avatarUrl:
//   //       "https://lh3.googleusercontent.com/ogw/ADea4I7ORI0C9jZ2xImwlgsEJ6DzS20voyev-EWZPHOx=s83-c-mo",
//   //     email: "annguyen26@gmail.com",
//   //     id: 2,
//   //     name: "An Nguyen",
//   //     role: "ADMIN",
//   //   },
//   // ];
//   const [memberdropdown, setmemberdropdown] = useState([]);

//   useEffect(() => {
//     const getData = () => {
//       dispatch(getAllUser(userId));
//     };
//     getData();
//   }, [userId, dispatch]);

//   useEffect(() => {
//     if (isAddMore) {
//       if (!_.isEmpty(memberData)) {
//         const datauser = memberData.map((item) => ({
//           ...item,
//           isAdd: false,
//         }));
//         setmemberdropdown(datauser);
//       }
//     } else if (!isAddMore) {
//       if (!_.isEmpty(editTeam)) {
//         const { users = [] } = editTeam;
//         const mappedlist = users.map((user) => ({
//           ...user,
//           isAdd: true,
//         }));
//         const datauser = memberData.map((item) => ({
//           ...item,
//           isAdd: false,
//         }));
//         const mappedMember = datauser.filter((member) => {
//           mappedlist.map((user) => {
//             if (user.userId === member.userId) {
//               member.isAdd = true;
//             }
//             return user;
//           });
//           return member;
//         });
//         setmemberdropdown(mappedMember);
//         setMembers(mappedlist);
//       }
//     }
//   }, [memberData, editProjectId, editTeam]);
//   const handleClickMember = (userId, avatarUrl, userName, email, isPM) => {
//     const memberUser = {
//       isAdd: true,
//       isPM: false,
//       userId: userId,
//       avatarUrl: avatarUrl,
//       userName: userName,
//       email: email,
//     };
//     setMembers([...members, memberUser]);

//     setmemberdropdown(
//       memberdropdown.map((item) => {
//         if (item.userId === memberUser.userId) {
//           item.isAdd = true;
//         }
//         return item;
//       })
//     );
//   };

//   useEffect(() => {
//     const mappedMemberByIdAndIsPM = members.map((m) => {
//       return {
//         isPM: m.isPM,
//         userId: m.userId,
//       };
//     });
//     setMemberByIdAndIsPM(mappedMemberByIdAndIsPM);
//     handleTeam(members);
//     handleTeamByIdAndIsPM(mappedMemberByIdAndIsPM);
//   }, [members]);

//   const handleAllMember = () => {
//     setMemberAllActive(true);
//     setMembers(
//       memberData.map((member) => {
//         return {
//           isPM: false,
//           userId: member.userId,
//           avatarUrl: member.avatarUrl,
//           userName: member.userName,
//           email: member.email,
//         };
//       })
//     );
//     setmemberdropdown(
//       memberdropdown.map((item) => {
//         item.isAdd = true;
//         return item;
//       })
//     );
//   };
//   const handleRemoveAllMember = () => {
//     setMembers([]);
//     setMemberAllActive(false);
//     setmemberdropdown(
//       memberdropdown.map((item) => {
//         item.isAdd = false;
//         return item;
//       })
//     );
//   };
//   const handleBlurMember = () => {
//     setTimeout(() => {
//       setMemberActive(false);
//     }, 150);
//   };

//   const deleteMembers = (userId) => {
//     const newMember = members.filter((member) => member.userId !== userId);
//     setMembers([...newMember]);

//     setmemberdropdown(
//       memberdropdown.map((item) => {
//         if (item.userId === userId) {
//           item.isAdd = false;
//         }
//         return item;
//       })
//     );
//   };
//   const handleCheckPM = (event, userId) => {
//     let checked = event.target.checked;
//     const membersPM = members.map((mem) => {
//       if (mem.userId !== userId) return mem;
//       return { ...mem, isPM: checked };
//     });
//     setMembers(membersPM);
//   };
//   return (
//     <div>
//       <div className="new-project-team-members">
//         <div className="new-project-team-members-title">
//           <h3 className="new-project-team-members-title-name">Team members</h3>
//         </div>
//         <Grid container className="new-project-team-members-body">
//           <Grid item xs={3}></Grid>
//           <Grid item xs={9}>
//             <table className="new-project-team-members-body-table">
//               <tbody>
//                 <tr className="row">
//                   <th className="row-0" />
//                   <th className="row-1">People</th>
//                   <th className="row-2">Project Manager</th>
//                 </tr>
//                 {members.map((member, key) => (
//                   <tr className="row" key={member.userId}>
//                     <td>
//                       <ClearIcon
//                         onClick={() => deleteMembers(member.userId)}
//                         className="row-icon-clear"
//                       />
//                     </td>
//                     <td className="row-3">
//                       <div className="row-3-image">
//                         <Avatar src={member.avatarUrl}></Avatar>
//                       </div>
//                       <div className="row-3-info">
//                         <p className="row-3-info-name">{member.userName}</p>
//                         {member.isPM && (
//                           <span className="row-3-info-PM ">PM</span>
//                         )}
//                         <p className="row-3-info-email">{member.email}</p>
//                       </div>
//                     </td>
//                     <td>
//                       <input
//                         type="checkbox"
//                         className="row-icon-check"
//                         onChange={(event) => {
//                           handleCheckPM(event, member.userId);
//                         }}
//                         checked={member.isPM}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="new-project-team-members-body-btn">
//               <div className="new-project-team-members-body-btn-add">
//                 <button
//                   className="new-project-team-members-body-btn-add-more"
//                   onFocus={() => setMemberActive(true)}
//                   onBlur={handleBlurMember}
//                 >
//                   Add more people...
//                 </button>
//                 {memberActive && (
//                   <div className="new-project-team-members-body-btn-add-member">
//                     {memberdropdown.map((mem, key) => (
//                       <MemberDropdownItem
//                         key={mem.userId}
//                         handleClickMember={handleClickMember}
//                         {...mem}
//                       />
//                     ))}
//                   </div>
//                 )}
//                 {memberAllActive ? (
//                   <button
//                     className="new-project-team-members-body-btn-add-all"
//                     onClick={handleRemoveAllMember}
//                   >
//                     Remove all people
//                   </button>
//                 ) : (
//                   <button
//                     className="new-project-team-members-body-btn-add-all"
//                     onClick={handleAllMember}
//                   >
//                     Add all people
//                   </button>
//                 )}
//               </div>

//               <div className="new-project-team-members-body-btn-link">
//                 <p>Need to add someone?</p>
//                 <p>
//                   Go to{" "}
//                   <Link
//                     className="new-project-team-members-body-btn-link-manage"
//                     to={PAGE_URLS.MANAGE}
//                   >
//                     Manage
//                   </Link>
//                   {" > "}{" "}
//                   <Link
//                     className="new-project-team-members-body-btn-link-manage"
//                     to={PAGE_URLS.MANAGE}
//                   >
//                     {" "}
//                     People
//                   </Link>{" "}
//                   to invite them to Time Cloud
//                 </p>
//               </div>
//             </div>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default TeamMembers;

import ClearIcon from "@mui/icons-material/Clear";
import { Avatar, Grid } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectMembers, setMember } from "../../../redux/slices/memberSlice";
import { PAGE_URLS } from "../../../constants/common";
import MemberDropdownItem from "./MemberDropdownItem";
import "./TeamMembers.scss";
import { userApi } from "../../../api/user/user.api";
const TeamMembers = ({
  idUser,
  handleTeam,
  handleTeamByIdAndIsPM,
  editTeam,
}) => {
  const params = useParams();
  const { editProjectId } = params;
  const isAddMore = !editProjectId;
  const [members, setMembers] = useState([]);
  const [memberByIdAndIsPM, setMemberByIdAndIsPM] = useState([]);
  const [memberActive, setMemberActive] = useState(false);
  const [memberAllActive, setMemberAllActive] = useState(false);
  const memberData = useSelector(selectMembers);
  const [memberdropdown, setmemberdropdown] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const mem = await userApi.getAllUser(idUser);
      dispatch(setMember(mem.data.resultObj));
    };
    fetchData();
  }, [idUser, dispatch]);

  useEffect(() => {
    if (isAddMore) {
      if (!_.isEmpty(memberData)) {
        const datauser = memberData.map((item) => ({
          ...item,
          isAdd: false,
        }));
        setmemberdropdown(datauser);
      }
    } else if (!isAddMore) {
      if (!_.isEmpty(editTeam)) {
        const { users = [] } = editTeam;
        const mappedlist = users.map((user) => ({
          ...user,
          isAdd: true,
        }));
        const datauser = memberData.map((item) => ({
          ...item,
          isAdd: false,
        }));
        const mappedMember = datauser.filter((member) => {
          mappedlist.map((user) => {
            if (user.userId === member.userId) {
              member.isAdd = true;
            }
            return user;
          });
          return member;
        });
        setmemberdropdown(mappedMember);
        setMembers(mappedlist);
      }
    }
  }, [memberData, editProjectId, editTeam]);
  const handleClickMember = (userId, avatarUrl, userName, email, isPM) => {
    const memberUser = {
      isAdd: true,
      isPM: false,
      userId: userId,
      avatarUrl: avatarUrl,
      userName: userName,
      email: email,
    };
    setMembers([...members, memberUser]);
    setmemberdropdown(
      memberdropdown.map((item) => {
        if (item.userId === memberUser.userId) {
          item.isAdd = true;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const mappedMemberByIdAndIsPM = members.map((m) => {
      return {
        isPM: m.isPM,
        userId: m.userId,
      };
    });
    setMemberByIdAndIsPM(mappedMemberByIdAndIsPM);
    handleTeam(members);
    handleTeamByIdAndIsPM(mappedMemberByIdAndIsPM);
  }, [members]);

  const handleAllMember = () => {
    setMemberAllActive(true);
    setMembers(
      memberData.map((member) => {
        return {
          isPM: false,
          userId: member.userId,
          avatarUrl: member.avatarUrl,
          userName: member.userName,
          email: member.email,
        };
      })
    );
    setmemberdropdown(
      memberdropdown.map((item) => {
        item.isAdd = true;
        return item;
      })
    );
  };
  const handleRemoveAllMember = () => {
    setMembers([]);
    setMemberAllActive(false);
    setmemberdropdown(
      memberdropdown.map((item) => {
        item.isAdd = false;
        return item;
      })
    );
  };
  const handleBlurMember = () => {
    setTimeout(() => {
      setMemberActive(false);
    }, 150);
  };

  const deleteMembers = (id) => {
    const newMember = members.filter((member) => member.userId !== id);
    setMembers([...newMember]);

    setmemberdropdown(
      memberdropdown.map((item) => {
        if (item.userId === id) {
          item.isAdd = false;
        }
        return item;
      })
    );
  };
  // const handleCheckPM = (event, id) => {
  //   let checked = event.target.checked;
  //   const membersPM = members.map((mem) => {
  //     if (mem.userId !== id) return mem;
  //     return { ...mem, isPM: checked };
  //   });
  //   setMembers(membersPM);
  // };
  return (
    <div>
      <div className="new-project-team-members">
        <div className="new-project-team-members-title">
          <h3 className="new-project-team-members-title-name">Team members</h3>
        </div>
        <Grid container className="new-project-team-members-body">
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <table className="new-project-team-members-body-table">
              <tbody>
                <tr className="row">
                  <th className="row-0" />
                  <th className="row-1">People</th>
                  {/* <th className="row-2">Project Manager</th> */}
                </tr>
                {members.map((member, key) => (
                  <tr className="row" key={member.userId}>
                    <td>
                      <ClearIcon
                        onClick={() => deleteMembers(member.userId)}
                        className="row-icon-clear"
                      />
                    </td>
                    <td className="row-3">
                      <div className="row-3-image">
                        <Avatar src={member.avatarUrl}></Avatar>
                      </div>
                      <div className="row-3-info">
                        <p className="row-3-info-name">{member.userName}</p>
                        {member.isPM && (
                          <span className="row-3-info-PM ">PM</span>
                        )}
                        <p className="row-3-info-email">{member.email}</p>
                      </div>
                    </td>
                    {/* <td>
                      <input
                        type="checkbox"
                        className="row-icon-check"
                        onChange={(event) => {
                          handleCheckPM(event, member.userId);
                        }}
                        checked={member.isPM}
                      />
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="new-project-team-members-body-btn">
              <div className="new-project-team-members-body-btn-add">
                <button
                  className="new-project-team-members-body-btn-add-more"
                  onFocus={() => setMemberActive(true)}
                  onBlur={handleBlurMember}
                >
                  Add more people...
                </button>
                {memberActive && (
                  <div className="new-project-team-members-body-btn-add-member">
                    {memberdropdown.map((mem, key) => (
                      <MemberDropdownItem
                        key={mem.userId}
                        handleClickMember={handleClickMember}
                        {...mem}
                      />
                    ))}
                  </div>
                )}
                {memberAllActive ? (
                  <button
                    className="new-project-team-members-body-btn-add-all"
                    onClick={handleRemoveAllMember}
                  >
                    Remove all people
                  </button>
                ) : (
                  <button
                    className="new-project-team-members-body-btn-add-all"
                    onClick={handleAllMember}
                  >
                    Add all people
                  </button>
                )}
              </div>

              <div className="new-project-team-members-body-btn-link">
                <p>Need to add someone?</p>
                <p>
                  Go to{" "}
                  <Link
                    className="new-project-team-members-body-btn-link-manage"
                    to={PAGE_URLS.MANAGE}
                  >
                    Manage
                  </Link>
                  {" > "}{" "}
                  <Link
                    className="new-project-team-members-body-btn-link-manage"
                    to={PAGE_URLS.MANAGE}
                  >
                    {" "}
                    People
                  </Link>{" "}
                  to invite them to Time Cloud
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TeamMembers;

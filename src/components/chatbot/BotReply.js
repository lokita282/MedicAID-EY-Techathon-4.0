// import React, { useEffect, useState } from "react";
// import { postChatbotMessage } from "../../services/patientService";
// import Loading from "../loader/Loading";

// const BotReply = ({}) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     const func = async () => {
//       await postChatbotMessage(data).then(async (res) => {
//         console.log(res);
//       });
//       setLoading(false);
//     };
//     func();
//   }, []);

//   return (
//     <div>
//       <h2>Hi</h2>
//     </div>
//   );
// };

// export default BotReply;

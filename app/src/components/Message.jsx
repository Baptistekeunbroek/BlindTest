export function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;

  if (user === name.trim()) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <div className="flex justify-end mt-2">
      <p className="flex items-center tracking-wide mr-1 text-[#828282]  ">{user}</p>

      <div className="bg-[#2979ff] rounded-xl text-white inline-block max-w-[80%] mr-3">
        <p className="w-max float-left text-white break-words mr-2 ml-2">{text}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-start mt-3 mr-3">
      <div className="bg-[#f3f3f3] rounded-xl inline-block max-w-[80%] mr-2 ml-2 ">
        <p className="ml-2 mr-2 w-max float-left text-black break-words">
          {text}
        </p>
      </div>
      <p className="flex items-center text-[#828282] tracking-wide">{user}</p>
    </div>
  );
}

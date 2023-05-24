export function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;

  if (user === name.trim()) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <div className="flex justify-end mt-2">
      <p className="flex   items-center tracking-wide mr-1 text-[#828282]  ">{user}</p>

      <div className="bg-[#2979ff] max-w-[75%] rounded-xl text-white inline-block mr-3">
        <p className="w-full float-left text-white break-words mr-2 ml-2">{text}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-start mt-3">
      <div className="bg-[#f3f3f3] max-w-[75%] rounded-xl inline-block mr-1 ml-1 ">
        <p className="w-full float-left text-black break-words pr-2 pl-2">{text}</p>
      </div>
      <p className="flex items-center text-[#828282] tracking-wide">{user}</p>
    </div>
  );
}

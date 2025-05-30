
function Button({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <button className="shadow-lg font-semibold mr-3 bg-gray-200 rounded-lg w-1/5 right-16 top-80 absolute" onClick={onClick} >
      {text}
    </button>
  );
}

export default Button;

import React, { useCallback, useEffect, useState } from "react";

const App = () => {
  const [Lenght, setLenght] = useState(6); //lenght of the password
  const [NumberAllowed, setNumberAllowed] = useState(false); // boolean to allow numbers in the password
  const [CharAllowed, setCharAllowed] = useState(false); // boolean to allow special characters in the password
  const [Password, setPassword] = useState(""); // state to store the generated password

  // function to generate the password based on the selected options
  const passwordGenerator = useCallback(() => {
    let pass = ""; // variable to store the generated password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // string of characters to choose from
    if (NumberAllowed) str += "0123456789";
    if (CharAllowed) str += "!@#$%^&*(){}[]+";
    // loop to generate the password based on the selected length runs until the desired length is reached
    for (let i = 0; i < Lenght; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length)); // random character is added to the password from the string of characters
    }
    setPassword(pass); // the generated password is stored in the state
  }, [Lenght, NumberAllowed, CharAllowed, setPassword]); // useCallback is used to memoize the passwordGenerator function, so it only changes when its dependencies change

  // useEffect is used to call the passwordGenerator function whenever the length, number allowed, or character allowed options change
  useEffect(() => {
    passwordGenerator();
  }, [length, NumberAllowed, CharAllowed, passwordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(Password);
  };

  return (
    <div className="h-screen w-full bg-[#674931] flex justify-center items-center">
      <div className="h-1/2 w-3/4 rounded-2xl p-3 flex justify-center items-center flex-col gap-3 bg-[#9A7E67]">
        <h1 className="font-black text-4xl text-[#CCBFB1] mb-4">
          Password Generator
        </h1>
        <div className=" w-full text-[#674931] text-2xl font-black flex justify-center items-center">
          <input
            className="h-14 rounded-l-xl w-4/6 bg-white "
            type="text"
            value={Password} // the generated password is displayed in the input field
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="h-14 w-23 rounded-r-xl bg-[#674931] active:scale-90 text-[#CCBFB1] text-2xl font-bold"
          >
            Copy
          </button>
        </div>
        <div className="w-full flex justify-center items-center gap-4 text-2xl text-[#CCBFB1] font-bold">
          <input
            className="h-14 w-45 bg-[#FFDBBA]"
            type="range"
            min="6"
            max="100"
            value={Lenght} // the selected length of the password is displayed in the range input
            onChange={(e) => setLenght(e.target.value)} // the length of the password is updated when the range input value changes
          />
          <label htmlFor="length">Length: {Lenght}</label>
          <input
            type="checkbox"
            id="numbers"
            checked={NumberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label htmlFor="numbers">Include Numbers</label>
          <input
            type="checkbox"
            id="characters"
            checked={CharAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label htmlFor="characters">Include Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;

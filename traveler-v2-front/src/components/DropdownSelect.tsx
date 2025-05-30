import Select from "react-select";

interface DropdownSelectProps {
  options: Array<{ value: string; label: string }>;
  onChange: (selectedOption: { value: string; label: string } | null) => void;
  text: string;
  textSize?: string;
  value?: { value: string; label: string } | null; // Add value prop
}

function DropdownSelect({ options, onChange, text, textSize = 'text-base', value }: DropdownSelectProps) {
  return (
    <div className="inline-block px-4 py-6">
      <h1 className={`pr-3 font-semibold inline-block ${textSize}`}>{text}</h1>
      <Select
        className="w-1/8 inline-block shadow-xl"
        options={options}
        onChange={onChange}
        value={value} // Set value here
        styles={{
          container: (provided) => ({
            ...provided,
            width: '8vw',
          }),
          control: (provided) => ({
            ...provided,
            width: '8vw',
          }),
        }}
      />
    </div>
  );
}

export default DropdownSelect;

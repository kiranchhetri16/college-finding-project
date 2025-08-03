const SiInput = ({ labelClassName = "", ...props }) => {
  return (
    <div className="flex flex-col gap-[6px]">
      <label
        className={`text-sm text-[#0F172A] leading-5 font-medium font-inter ${labelClassName}`}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        required={props.required}
        className="px-[12px] py-2 text-[#0F172A] text-sm font-normal font-inter leading-5 border border-[#CBD5E1] rounded-[6px] outline-[#433D71]"
      />
    </div>
  );
};

export default SiInput;

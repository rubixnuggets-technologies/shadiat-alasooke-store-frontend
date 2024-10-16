import classNames from "classnames";

interface CheckboxProps {
  isActive: boolean;
  selectCheckbox: () => void;
  borderColor?: string;
}

export default function Checkbox({
  isActive,
  borderColor,
  selectCheckbox = () => {},
}: CheckboxProps) {
  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          className={classNames(
            "peer h-3.5 w-3.5 lg:h-5 lg:w-5 cursor-pointer transition-all appearance-none  border checked:bg-slate-800 checked:border-slate-800",
            borderColor ? borderColor : "border-brown-light-1500"
          )}
          id="check"
          style={{ borderRadius: "2px" }}
          checked={isActive}
          onChange={() => selectCheckbox()}
        />
        <span className="absolute text-brown-2100 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 lg:h-3.5 lg:w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
    </div>
  );
}

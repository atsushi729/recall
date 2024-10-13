import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { SelectOption } from "~/types/selectBox";

interface SelectBoxProps {
  options: SelectOption[];
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

const SelectBox = ({ options, label, value, onChange }: SelectBoxProps) => {
  const selectedOption =
    options.find((option) => option.name === value) || null;

  const handleChange = (option: SelectOption) => {
    onChange(option.name);
  };

  return (
    <div className="w-64">
      <Listbox value={selectedOption} onChange={handleChange}>
        {label && (
          <Listbox.Label className="block text-sm font-medium text-gray-200 mb-1">
            {label}
          </Listbox.Label>
        )}
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default bg-gray-800 py-3 pl-3 pr-10 text-left text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="block truncate">
              {selectedOption ? selectedOption.name : `Select ${label}`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-700 text-white" : "text-gray-200"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectBox;

import { CircleHelpIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type FieldType = "text" | "email" | "tel" | "number" | "checkbox" | "array";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  maxLength?: number | string;
  placeholder?: string;
  helpText?: string;
  itemType?: string;
  actions?: {
    add: boolean;
    clear: boolean;
  };
  defaultValue?: string | boolean | string[];
  optional?: boolean;
  dataType: string;
}

export interface FormSection {
  title: string;
  fields: FormField[];
}

export interface FormConfig {
  sections: FormSection[];
}

type FormValues = {
  [K: string]: string | boolean | string[];
};

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: (values: FormValues) => void;
}

interface FormFieldProps {
  field: FormField;
  formValues: FormValues;
  arrayFields: Record<string, string[]>;
  onInputChange: (fieldId: string, value: string | boolean) => void;
  onArrayAdd: (fieldId: string) => void;
  onArrayClear: (fieldId: string) => void;
  onArrayItemChange: (fieldId: string, index: number, value: string) => void;
  onArrayItemDelete: (fieldId: string, index: number) => void;
}

const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  formValues,
  arrayFields,
  onInputChange,
  onArrayAdd,
  onArrayClear,
  onArrayItemChange,
  onArrayItemDelete,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const togglePopover = (): void => {
    setShowPopover((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (!popoverRef.current) return;
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);

  switch (field.type) {
    case "array":
      return (
        <div key={field.id} className="form-field">
          <div className="flex gap-2">
            <label className="font-inter text-sm font-[600]">
              {field.label.toLowerCase().replaceAll(" ", "_")}
            </label>
            <div className="ml-auto flex gap-2 font-sm font-[600]">
              <button type="button" onClick={() => onArrayAdd(field.id)}>
                + ADD ITEM
              </button>
              <button type="button" onClick={() => onArrayClear(field.id)}>
                CLEAR
              </button>
            </div>
          </div>
          {arrayFields[field.id]?.map((item, index) => (
            <div
              key={index}
              className="array-item ml-6 text-[#012a38] flex gap-2 border-b border-solid border-[#A2C1C4] overflow-clip"
            >
              <button
                type="button"
                onClick={() => onArrayItemDelete(field.id, index)}
              >
                ✕
              </button>
              <label className="font-inter text-sm font-[600]">item</label>
              <span className="font-inter text-sm italic">string</span>
              <input
                className="pl-2 pr-16 ml-auto focus:outline outline-[#012A384D] bg-white/50 border-none"
                style={{
                  boxShadow:
                    "0px 0px 9px 6px #D2F6FA, 1px 2px 4px 0px rgba(0, 0, 0, 0.25) inset",
                }}
                type="text"
                value={item}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onArrayItemChange(field.id, index, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div
          key={field.id}
          className="text-[#012a38] flex gap-2 border-b border-solid border-[#A2C1C4]"
        >
          <label className="font-inter text-sm font-[600] flex">
            {field.label.toLowerCase().replaceAll(" ", "_")}
          </label>
          <span className="font-inter text-sm italic">{field.dataType}</span>
          <input
            className="ml-auto"
            type="checkbox"
            checked={Boolean(formValues[field.id])}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onInputChange(field.id, e.target.checked)
            }
          />
        </div>
      );

    default:
      return (
        <div
          key={field.id}
          className="text-[#012a38] flex gap-2 border-b border-solid border-[#A2C1C4]"
        >
          <label className="font-inter text-sm font-[600]">
            {field.label.toLowerCase().replaceAll(" ", "_")}
          </label>
          <span className="font-inter text-sm italic">{field.dataType}</span>
          <div className="ml-auto relative overflow-visible group">
            <input
              type={field.type}
              value={String(formValues[field.id] || "")}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onInputChange(field.id, e.target.value)
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required={field.required}
              maxLength={field.maxLength as number}
              placeholder={field.placeholder}
              className={`pl-2 pr-16 focus:outline outline-[#012A384D] bg-transparent border-none ${
                (!!formValues[field.id] || isFocused) && "bg-white"
              }`}
              style={
                !!formValues[field.id] || isFocused
                  ? {
                      boxShadow:
                        "0px 0px 3px 3px #D2F6FA, 1px 2px 2px 0px rgba(0, 0, 0, 0.25) inset",
                    }
                  : {}
              }
            />
            {field.helpText && (
              <span
                className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-lg bg-[D2F6FA] hover:bg-gray-200 text-gray-500 cursor-pointer"
                title={field.helpText}
                onClick={togglePopover}
              >
                <CircleHelpIcon className="w-4 h-4" />
              </span>
            )}
            {showPopover && (
              <div
                ref={popoverRef}
                className="absolute right-0 bottom-6 mt-2 bg-white border border-gray-300 shadow-lg p-2 rounded text-sm text-gray-700 z-10 w-48"
              >
                {field.helpText}
              </div>
            )}
          </div>
        </div>
      );
  }
};

const Form: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [arrayFields, setArrayFields] = useState<Record<string, string[]>>({
    exemptionDetails: [],
  });

  const handleInputChange = (
    fieldId: string,
    value: string | boolean
  ): void => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleArrayAdd = (fieldId: string): void => {
    setArrayFields((prev) => ({
      ...prev,
      [fieldId]: [...(prev[fieldId] || []), ""],
    }));
  };

  const handleArrayClear = (fieldId: string): void => {
    setArrayFields((prev) => ({
      ...prev,
      [fieldId]: [],
    }));
  };

  const handleArrayItemChange = (
    fieldId: string,
    index: number,
    value: string
  ): void => {
    setArrayFields((prev) => {
      const newArray = [...prev[fieldId]];
      newArray[index] = value;
      return {
        ...prev,
        [fieldId]: newArray,
      };
    });
  };

  const handleArrayItemDelete = (fieldId: string, index: number): void => {
    setArrayFields((prev) => {
      const newArray = [...prev[fieldId]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [fieldId]: newArray,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({ ...formValues, ...arrayFields });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {config.sections.map((section) => (
        <div key={section.title} className="">
          <h2 className="text-[#012A38] font-inter text-sm font-normal">
            {section.title}
          </h2>
          <div className="ml-2.5 pl-2 border-l border-solid border-[#92A1A8]">
            {section.fields.map((field) => (
              <FormFieldComponent
                key={field.id}
                field={field}
                formValues={formValues}
                arrayFields={arrayFields}
                onInputChange={handleInputChange}
                onArrayAdd={handleArrayAdd}
                onArrayClear={handleArrayClear}
                onArrayItemChange={handleArrayItemChange}
                onArrayItemDelete={handleArrayItemDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </form>
  );
};

export default Form;

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export type FieldType =
  | "text"
  | "select"
  | "number"
  | "textarea"
  | "date"
  | "datetime"
  | "radio"
  | "checkbox"
  | "switch"
  | "multiSelect"
  | "selectMonthYear" // New: { month: "Jan", year: "2024" }
  | "spendMonthYear"; // New: { years: 4, months: 6 }

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // Used for select and radio
  placeholder?: string;
  colSpan?: boolean;
}

interface DynamicFormModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  initialData?: any;
  fields: FormField[];
}

// Helpers for the new select fields
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const currentYear = new Date().getFullYear();
// Generate years from 20 years ago to 10 years in the future
const YEARS = Array.from({ length: 31 }, (_, i) =>
  (currentYear - 20 + i).toString(),
);

export function DynamicFormModal({
  title,
  isOpen,
  onClose,
  onSave,
  initialData,
  fields,
}: DynamicFormModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
    }
  }, [initialData, isOpen]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-slate-50/50 backdrop-blur-sm">
        <DialogHeader className="pb-4 border-b border-slate-200">
          <DialogTitle className="text-xl font-bold text-slate-800">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Fill in the details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`space-y-2.5 ${field.colSpan ? "md:col-span-2" : ""}`}
            >
              {/* Handle layout for Switch and Checkbox (Label is usually on the right or inside) */}
              {field.type !== "switch" && field.type !== "checkbox" && (
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-slate-700"
                >
                  {field.label}
                </Label>
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="resize-none min-h-[100px] bg-white transition-all focus-visible:ring-blue-500"
                />
              )}

              {/* Select */}
              {field.type === "select" && (
                <select
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {/* NEW: Select Month & Year (Start/End dates) */}
              {field.type === "selectMonthYear" && (
                <div className="flex gap-3">
                  <select
                    value={formData[field.name]?.month || ""}
                    onChange={(e) =>
                      handleChange(field.name, {
                        ...formData[field.name],
                        month: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Month
                    </option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData[field.name]?.year || ""}
                    onChange={(e) =>
                      handleChange(field.name, {
                        ...formData[field.name],
                        year: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Year
                    </option>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* NEW: Spend Month & Year (Experience duration) */}
              {field.type === "spendMonthYear" && (
                <div className="flex gap-4 items-center">
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={formData[field.name]?.years || ""}
                      onChange={(e) =>
                        handleChange(field.name, {
                          ...formData[field.name],
                          years: parseInt(e.target.value) || 0,
                        })
                      }
                      className="bg-white focus-visible:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                      Years
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="11"
                      placeholder="0"
                      value={formData[field.name]?.months || ""}
                      onChange={(e) =>
                        handleChange(field.name, {
                          ...formData[field.name],
                          months: parseInt(e.target.value) || 0,
                        })
                      }
                      className="bg-white focus-visible:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
                      Months
                    </span>
                  </div>
                </div>
              )}

              {/* Radio Group */}
              {field.type === "radio" && (
                <RadioGroup
                  value={formData[field.name]}
                  onValueChange={(val) => handleChange(field.name, val)}
                  className="flex flex-wrap gap-5 pt-2"
                >
                  {field.options?.map((opt) => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={opt}
                        id={`${field.name}-${opt}`}
                        className="text-blue-600 border-slate-300"
                      />
                      <Label
                        htmlFor={`${field.name}-${opt}`}
                        className="text-sm text-slate-700 cursor-pointer"
                      >
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Checkbox (Single Boolean) */}
              {field.type === "checkbox" && (
                <div className="flex items-center space-x-3 pt-2">
                  <Checkbox
                    id={field.name}
                    checked={formData[field.name] || false}
                    onCheckedChange={(checked) =>
                      handleChange(field.name, checked)
                    }
                    className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700 leading-none cursor-pointer"
                  >
                    {field.label}
                  </Label>
                </div>
              )}

              {/* Switch (Shadcn Toggle) */}
              {field.type === "switch" && (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300">
                  <Label
                    htmlFor={field.name}
                    className="flex flex-col space-y-1 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-slate-800">
                      {field.label}
                    </span>
                    {field.placeholder && (
                      <span className="text-xs text-slate-500 font-normal">
                        {field.placeholder}
                      </span>
                    )}
                  </Label>
                  <Switch
                    id={field.name}
                    checked={formData[field.name] || false}
                    onCheckedChange={(checked) =>
                      handleChange(field.name, checked)
                    }
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              )}

              {field.type === "multiSelect" && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700">
                    {/* {field.label} */}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {field.options?.map((option) => {
                      // Assuming 'formData' holds your current form state
                      // We treat the stored value as a comma-separated string
                      const currentValue = formData[field.name] || "";
                      const selectedOptions = currentValue
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean);
                      const isSelected = selectedOptions.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            let newSelection;
                            if (isSelected) {
                              // Remove it
                              newSelection = selectedOptions.filter(
                                (item: string) => item !== option,
                              );
                            } else {
                              // Add it
                              newSelection = [...selectedOptions, option];
                            }
                            // Save it back to state as a comma-separated string
                            setFormData({
                              ...formData,
                              [field.name]: newSelection.join(", "),
                            });
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Standard Inputs: Text, Number, Date, DateTime */}
              {(field.type === "text" ||
                field.type === "number" ||
                field.type === "date" ||
                field.type === "datetime") && (
                <Input
                  id={field.name}
                  type={
                    field.type === "datetime" ? "datetime-local" : field.type
                  }
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-white transition-all focus-visible:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4 border-t border-slate-200 gap-2 sm:gap-0 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="border-slate-200 hover:bg-slate-100 text-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px] shadow-sm"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

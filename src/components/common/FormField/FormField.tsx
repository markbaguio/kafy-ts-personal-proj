import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>; // safer than keyof T, Path respects nested keys like "user.name"
  placeholder?: string;
};

export function FormField<T extends FieldValues>({
  label,
  name,
  placeholder,
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="space-y-1 w-full">
      <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        {...register(name)}
        className={`${
          error
            ? "focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive border-destructive"
            : "focus-visible:border-success-green focus-visible:ring-success-green"
        }`}
      />
      {typeof error?.message === "string" && (
        <span className="text-destructive text-[12px] text-start">
          {error.message}
        </span>
      )}
    </div>
  );
}

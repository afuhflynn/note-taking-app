"use client";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

interface InputProps {
  type: string;
  isPassword?: boolean;
  onChange: (name: string, value: string) => void;
  value: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  name: string;
  placeholder?: string;
}

export function AuthInput({
  isPassword,
  onChange,
  value,
  type,
  name,
  placeholder,
  className,
  isLoading,
  disabled,
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  if (type === "password") {
    return (
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            !isLoading && onChange(e.target.name, e.target.value)
          }
          disabled={disabled}
          required
          className={`${className} bg-transparent w-full pr-10 rounded-xl cursor-pointer`}
        />
        {isPassword && isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    );
  }
  if (type !== "password") {
    return (
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            !isLoading && onChange(e.target.name, e.target.value)
          }
          disabled={disabled}
          required
          className={`${className} bg-transparent w-full rounded-xl cursor-pointer`}
        />
      </div>
    );
  }
}

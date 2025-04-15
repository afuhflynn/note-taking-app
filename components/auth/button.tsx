import { CustomLoader1 } from "../loader";
import { Button } from "../ui/button";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AuthButton({
  title,
  type,
  isLoading,
  className,
  disabled,
}: ButtonProps) {
  return (
    <Button
      type={type ? type : "button"}
      disabled={disabled || isLoading}
      size="lg"
      className={`${className} w-full bg-blue-500 hover:bg-blue-600 rounded-xl !mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-input ring-offset-background`}
    >
      {isLoading ? <CustomLoader1 /> : title}
    </Button>
  );
}

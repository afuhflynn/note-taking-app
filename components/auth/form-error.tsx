interface FormError {
  error?: string | any | null;
}

export const FormError = ({ error }: FormError) => {
  if (error) {
    return (
      <div className="w-full flex items-center justify-center rounded-lg bg-red-200 p-4 mt-4">
        <p className="text-red-500 text-sm font-semibold">{error}</p>
      </div>
    );
  }
};

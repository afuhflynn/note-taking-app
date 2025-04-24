interface FormSuccess {
  message?: string | any | null;
}

export const FormSuccess = ({ message }: FormSuccess) => {
  if (message) {
    return (
      <div className="w-full flex items-center justify-center rounded-lg bg-emerald-200 p-4 mt-4">
        <p className="text-emerald-500 text-sm">{message}</p>
      </div>
    );
  }
};

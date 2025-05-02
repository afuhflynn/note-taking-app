interface FormSuccess {
  message?: string | null;
}

export const FormSuccess = ({ message }: FormSuccess) => {
  if (message && message.length > 0) {
    return (
      <div className="w-full flex items-center justify-center rounded-lg bg-emerald-200 p-4 mt-4">
        <p className="text-emerald-500 text-sm">{message}</p>
      </div>
    );
  }
};

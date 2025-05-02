import { AuthButton } from "../auth/button";

export const ActionBar = () => {
  return (
    <div className="h-[41px] flex items-center gap-2 absolute bottom-0">
      <AuthButton title="Save Note" className="!m-0 !w-auto !h-auto py-3 " />
      <AuthButton
        title="Cancel"
        className="!bg-destructive !m-0 !w-auto !h-auto py-3 "
      />
    </div>
  );
};

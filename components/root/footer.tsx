export const Footer = () => {
  return (
    <footer className="border-t py-6 bg-muted/30 flex items-center justify-center paddingX">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Notes. All rights reserved.
      </p>
    </footer>
  );
};

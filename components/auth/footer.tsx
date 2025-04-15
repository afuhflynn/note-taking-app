import Link from "next/link";

interface FooterProps {
  comment: string;
  sub: string;
  subUrl: string;
}

export function Footer({ comment, sub, subUrl }: FooterProps) {
  return (
    <div className="text-center text-sm mt-4">
      <span className="text-muted-foreground">{comment}?</span>{" "}
      <Link href={`/auth/${subUrl}`} className="hover:underline font-medium">
        {sub}
      </Link>
    </div>
  );
}

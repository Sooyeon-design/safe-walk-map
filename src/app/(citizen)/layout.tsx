import localFont from "next/font/local";

const pretendard = localFont({
  src: [
    {
      path: "../../../node_modules/pretendard/dist/web/static/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../node_modules/pretendard/dist/web/static/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={pretendard.variable} style={{ fontFamily: "var(--font-pretendard)" }}>
      {children}
    </div>
  );
}

import "../css/Layout.css";
import "../tailwind.css";

import PageLayout from "./layouts/PageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}

import { redirect } from "next/navigation";

/** Login UI retired — hub owns cohort entry; old bookmarks land in the student app. */
export default function LoginRedirectPage() {
  redirect("/student/courses");
}

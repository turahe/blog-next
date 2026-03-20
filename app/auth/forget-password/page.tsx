import { redirect } from "next/navigation";

export default function ForgetPasswordAliasPage() {
  redirect("/auth/forgot-password");
}

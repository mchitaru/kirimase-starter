"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { signOutAction } from "@/lib/actions/users";

export default function SignOutBtn() {
  return (
    <Button variant={"destructive"} onClick={() => signOutAction()}>
      Sign out
    </Button>

    // <form action={signOutAction} className="w-full text-left">
    //   <Btn />
    // </form>
  );
}

// const Btn = () => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending} variant={"destructive"}>
//       Sign{pending ? "ing" : ""} out
//     </Button>
//   );
// };

"use client";

import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";


import { useBalance } from "@repo/store/useBalance"
import { useSession } from "next-auth/react";

// export default function () {
//   const balance = useBalance();
//   return <div>
//     hi there {balance}
//   </div>
// }

export default function Home() {
  const balance = useBalance();
  const session = useSession()
  return <div>
    hi there {balance}
    {JSON.stringify(session)}
  </div>
}

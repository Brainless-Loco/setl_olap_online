"use client"

import Viewport1 from "@/components/navbar/Viewports/Panel 1/Viewport1";
import { useEffect, useState } from "react";

export default function Home() {

  const [aboxIRI, setABoxIRI] = useState('')
  const [tboxIRI, setTBoxIRI] = useState('')

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Viewport1/>
    </main>
  );
}

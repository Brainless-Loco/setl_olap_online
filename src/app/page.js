"use client"

import Viewport1 from "@/components/navbar/Viewports/Panel 1/Viewport1";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from '../lib/redux/store'

export default function Home() {

  return (
    
    <Provider store={store}>
      <main className="flex min-h-screen flex-col justify-between">
        <Viewport1/>
      </main>
    </Provider>
  );
}

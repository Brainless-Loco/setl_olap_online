"use client"

import Viewport1 from "@/components/Viewports/Panel 1/Viewport1";
import { Provider } from "react-redux";
import store from '../lib/redux/store'
import Viewport2 from "@/components/Viewports/Panel 2/ViewPort2";

export default function Home() {

  return (
    
    <Provider store={store}>
      <main className="flex min-h-screen flex-row justify-evenly flex-wrap">
        <Viewport1 />
        <Viewport2 />
      </main>
    </Provider>
  );
}


// 

import { Children } from "react";

export default function Layout ({Children}) {

    // add component here

   return <div className="main rounded-md shadow-md bg-slate-200">
      {Children}
    </div>
}
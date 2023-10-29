"use client"

import { HOC } from "@/components/HOC";

function Home() {
  return (
    <HOC>
      <div>
        <p className="text-red-500">Welcome to AWriter.</p>
      </div>
      <div>
        <p>We will be building this through the test app to see how next js works</p>
      </div>
    </HOC>
  )
}
export default Home;

import Heroswiper from "./heroswiper"



async function getHomeData() {
  const res = await fetch(`${process.env.backend_url + "api/v1/"}banner/public?status=true`, { cache: "no-store" })
  if (!res.ok) return {}
  return res.json()
}

const HeroSection = async() => {
  const data = await getHomeData()

  return (
    <div className="relative w-full container">
      <Heroswiper data={data} />
    </div>
  )
}

export default HeroSection
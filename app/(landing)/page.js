import React from 'react'
import HeroSection from '../components/landing/home/hero'
import AdvertisementBanner from '../components/landing/home/advertisementBanner'
import TopCategories from '../components/landing/home/topCategories'
import FlashSale from '../components/landing/home/flashSale'
import Promotion from '../components/landing/home/promotion'
import OnlyforYou from '../components/landing/home/onlyforYou'
import Topsells from '../components/landing/home/topsells'
import TrandingEvent from '../components/landing/home/trandingEvent'


async function getServerSideProps() {
  try {
    const url = `${process.env.backend_url || ""}api/v1/product/section/home`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) {
      return { data: { categories: [], sections: [] } }
    }
    const json = await res.json()
    if (!json || typeof json !== "object" || !json.data) {
      return { data: { categories: [], sections: [] } }
    }
    if (!Array.isArray(json.data.categories)) json.data.categories = []
    if (!Array.isArray(json.data.sections)) json.data.sections = []
    return json
  } catch (err) {
     console.error("Error fetching home data:", err)
    return { data: { categories: [], sections: [] } }
  }
}

export default async function Home() {
  const data = await getServerSideProps()
  const allCategories = data?.data ?.categories || []
  return (
    <div>
      
      <h3 className='text-2xl text-primary'>Home</h3>
    </div>
  )
}
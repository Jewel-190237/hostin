'use client'
import Link from 'next/link'
import React from 'react'

const SectionTittle = ({ title, linkText, linkHref,font }) => {
  return (
    <div className="flex justify-between border group p-[10px] items-center mb-[10px]">
      <h2 className={`text-xl font-${font} font-roboto capitalize leading-7 text-textMain`}>{title}</h2>
      <Link
        href={linkHref}
        className="text-xl font-normal font-roboto leading-7 underline decoration-primary underline-offset-4"
      >
        {linkText}
      </Link>
    </div>
  )
}

export default SectionTittle
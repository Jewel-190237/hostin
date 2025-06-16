'use client'
import React from 'react'
import SectionTittle from '../common/sectionTittle'
import ProductCard from '../cards/productCard'
import { useI18n } from '@/app/context/i18n'

const OnlyforYou = ({section}) => {
  const {langCode} = useI18n()
  return (
    <div className='container my-10 px-4'>
      <SectionTittle
        title={section?.section?.name[langCode]}
        linkText="All Product"
        font={'bold'}
        linkHref="/flash-sale"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {section?.topProducts?.slice(0, 4)?.map((product, index) => (
          <ProductCard key={index} data={product} />
        ))}
      </div>
    </div>
  )
}

export default OnlyforYou
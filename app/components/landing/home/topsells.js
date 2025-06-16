'use client'
import React from 'react'
import SectionTittle from '../common/sectionTittle'
import Image from 'next/image'
import ProductCard from '../cards/productCard'
import Link from 'next/link'
import { useI18n } from '@/app/context/i18n'

const Topsells = ({section}) => {
  const {langCode} = useI18n();

  return (
    <section className="w-full py-6 px-4">
      <div className="container mx-auto">
      <h1 className='text-textMain text-[28px] capitalize md:mb-5 mb-3 font-roboto font-bold'>
  {section?.section?.name[langCode] 
    ? section.section.name[langCode].split(' ').slice(0, -1).join(' ') + ' ' 
    : ''
  }
  <span className='text-orange-500'>
    {section?.section?.name[langCode] 
      ? section.section.name[langCode].split(' ').slice(-1) 
      : ''
    }
  </span>
</h1>
        <SectionTittle
          title="On Sale Now" 
          linkText="All Product" 
          font={'normal'}
          linkHref={'/shop'} 
        />

        <div className="flex lg:flex-row flex-col gap-6">
          <div className="w-[100%] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6">
            {section?.topProducts.slice(0, 6).map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
          <Link href={section?.section?.marketing_link || '/'} className=" md:h-[724px] h-[500px] w-[100%] lg:w-[312px] rounded-lg overflow-hidden">
            <Image
              src={section?.section?.marketing_image || '/default.png'}
              alt="Soy Milk Promotion"
              width={500}
              height={1000}
              className="lg:h-[724px] sm:h-[600px] h-[500px] object-fill lg:object-cover !w-full"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topsells
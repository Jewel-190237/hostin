"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  ArrowUpOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  EyeOutlined
} from "@ant-design/icons"
import { Button, Badge, Input, Tooltip, Modal, Switch } from "antd"
import productData from "@/public/product.json"
import SectionDropdown from "./sectionDropdown"

const getFieldValue = (p, field) => {
  if (field === "price" || field === "final_price" || field === "discount") return p[field]
  if (field.startsWith("attr_")) {
    const attr = p.attributes.find(a => a.name === field.replace("attr_", ""))
    return attr ? attr.values[0] : null
  }
  if (field.startsWith("spec_")) return p.specifications?.[field.replace("spec_", "")]
  if (field === "shipping_days") return p.shipping_days
  if (field === "free_shipping") return p.free_shipping ? 1 : 0
  return p[field]
}

const sortProductsArr = (arr, field, direction) => [...arr].sort((a, b) => {
  let valueA = getFieldValue(a, field)
  let valueB = getFieldValue(b, field)
  if (typeof valueA === "boolean" && typeof valueB === "boolean")
    return direction === "asc" ? (valueA === valueB ? 0 : valueA ? -1 : 1) : (valueA === valueB ? 0 : valueA ? 1 : -1)
  if (typeof valueA === "number" && typeof valueB === "number")
    return direction === "asc" ? valueA - valueB : valueB - valueA
  return direction === "asc"
    ? String(valueA || "").localeCompare(String(valueB || ""))
    : String(valueB || "").localeCompare(String(valueA || ""))
})

const hasDifferences = (products, field) => {
  if (products.length <= 1) return false
  const values = products.map(p => getFieldValue(p, field)).filter(v => v !== undefined && v !== null)
  return values.length > 1 && !values.every(v => v === values[0])
}

const getBestValue = (products, field) => {
  if (products.length <= 1) return []
  if (field === "price" || field === "final_price") {
    const min = Math.min(...products.map(p => p[field]))
    return products.filter(p => p[field] === min).map(p => p.id)
  }
  if (field === "discount") {
    const max = Math.max(...products.map(p => p[field]))
    return products.filter(p => p[field] === max).map(p => p.id)
  }
  if (field.startsWith("spec_")) {
    const spec = field.replace("spec_", "")
    const vals = products.filter(p => p.specifications?.[spec] !== undefined)
    if (vals.length <= 1) return []
    const first = vals[0].specifications[spec]
    if (vals.every(p => p.specifications[spec] === first)) return []
    if (typeof first === "number") {
      const max = Math.max(...vals.map(p => p.specifications[spec]))
      return vals.filter(p => p.specifications[spec] === max).map(p => p.id)
    }
    if (typeof first === "boolean") return vals.filter(p => p.specifications[spec] === true).map(p => p.id)
  }
  if (field === "shipping_days") {
    const min = Math.min(...products.map(p => p.shipping_days))
    return products.filter(p => p.shipping_days === min).map(p => p.id)
  }
  if (field === "free_shipping") return products.filter(p => p.free_shipping).map(p => p.id)
  return []
}

const getAllAttributeNames = products => {
  const names = new Set()
  products.forEach(p => p.attributes.forEach(attr => names.add(attr.name)))
  return Array.from(names)
}

const getAllSpecificationNames = products => {
  const names = new Set()
  products.forEach(p => p.specifications && Object.keys(p.specifications).forEach(key => names.add(key)))
  return Array.from(names)
}

const calculateSavings = product =>
  product.discount_type === "percentage" ? (product.price * product.discount) / 100 : product.discount

export default function ProductComparison({
  initialProducts = [productData[0]],
  allProducts = productData,
  language = "en",
}) {
  const [visibleProducts, setVisibleProducts] = useState(initialProducts)
  const [availableProducts, setAvailableProducts] = useState(allProducts.filter(p => !initialProducts.includes(p)))
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightDifferences, setHighlightDifferences] = useState(true)
  const [expandedSections, setExpandedSections] = useState(["basic", "price", "attributes", "shipping"])
  const [sortedBy, setSortedBy] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filteredAvailableProducts = availableProducts.filter(product =>
    product.name[language].toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSection = section =>
    setExpandedSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section])
  const isSectionExpanded = section => expandedSections.includes(section)
  const addProduct = product => {
    setVisibleProducts(prev => [...prev, product])
    setAvailableProducts(prev => prev.filter(p => p.id !== product.id))
    setSearchTerm("")
  }
  const removeProduct = productId => {
    const removed = visibleProducts.find(p => p.id === productId)
    setVisibleProducts(prev => prev.filter(p => p.id !== productId))
    if (removed) setAvailableProducts(prev => [...prev, removed])
  }
  const sortProducts = field => {
    const newDirection = sortedBy?.field === field && sortedBy.direction === "asc" ? "desc" : "asc"
    setSortedBy({ field, direction: newDirection })
    setVisibleProducts(prev => sortProductsArr(prev, field, newDirection))
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
       <div className=""></div>
        <div>
          <Button icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
            Add Product
          </Button>
          <Modal
            title="Add Product to Compare"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredAvailableProducts.length > 0 ? (
                filteredAvailableProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => { addProduct(product); setModalOpen(false); }}
                  >
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.name[language]}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name[language]}</p>
                      <p className="text-sm text-gray-500 truncate">${product.final_price.toFixed(2)}</p>
                    </div>
                    <Button size="small" icon={<PlusOutlined />} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No products found</p>
              )}
            </div>
          </Modal>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            {/* Product headers */}
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="p-4 text-left w-[200px]"></th>
                {visibleProducts.map((product) => (
                  <th key={product.id} className="p-4 text-center relative min-w-[220px]">
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2"
                    />
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-3">
                        <Image
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.name[language]}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-center">{product.name[language]}</h3>

                      {product.highlights && product.highlights.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1 justify-center">
                          {product.highlights.map((highlight, idx) => (
                            <Badge key={idx} color="blue" count={highlight} style={{ backgroundColor: "#f0f0f0", color: "#333" }} />
                          ))}
                        </div>
                      )}

                      <div className="mt-3 flex gap-2">
                        <Button size="small" icon={<EyeOutlined />}>View</Button>
                        <Button size="small" type="primary" icon={<ShoppingCartOutlined />}>Add</Button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="!container !mx-auto">
              {/* Basic Info Section */}
              <SectionDropdown
                section="basic"
                expanded={isSectionExpanded("basic")}
                onToggle={toggleSection}
              >
                {/* Use colSpan dynamically */}
                <span colSpan={visibleProducts.length + 1}>Basic Information</span>
              </SectionDropdown>
              {isSectionExpanded("basic") && (
                <>
                  {/* SKU row */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-700">SKU</td>
                    {visibleProducts.map((product) => (
                      <td key={`${product.id}-sku`} className="p-4 text-center">
                        {product.sku}
                      </td>
                    ))}
                  </tr>

                  {/* Code row */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-700">Code</td>
                    {visibleProducts.map((product) => (
                      <td key={`${product.id}-code`} className="p-4 text-center">
                        {product.code}
                      </td>
                    ))}
                  </tr>

                  {/* Brand row */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-700">Brand</td>
                    {visibleProducts.map((product) => (
                      <td key={`${product.id}-brand`} className="p-4 text-center">
                        {product.brand}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Price Section */}
              <SectionDropdown
                section="price"
                expanded={isSectionExpanded("price")}
                onToggle={toggleSection}
              >
                <span colSpan={visibleProducts.length + 1}>Price Information</span>
              </SectionDropdown>
              {isSectionExpanded("price") && (
                <>
                  {/* Price row */}
                  <tr
                    className={`border-b border-gray-200${highlightDifferences && hasDifferences(visibleProducts, "price") ? " bg-blue-50" : ""}`}
                  >
                    <td className="p-4 font-medium text-gray-700 flex items-center">
                      <span>Regular Price</span>
                      <button onClick={() => sortProducts("price")} className="ml-2 text-gray-500 hover:text-gray-700">
                        <ArrowUpOutlined />
                      </button>
                      {highlightDifferences && hasDifferences(visibleProducts, "price") && (
                        <Tooltip title="Products differ on this feature">
                          <InfoCircleOutlined className="ml-2 text-blue-500" />
                        </Tooltip>
                      )}
                    </td>
                    {visibleProducts.map((product) => {
                      const isBest = getBestValue(visibleProducts, "price").includes(product.id)

                      return (
                        <td key={`${product.id}-price`} className={`p-4 text-center${isBest ? " bg-green-50" : ""}`}>
                          <div className="flex flex-col items-center">
                            <span className="font-medium">${product.price.toFixed(2)}</span>

                            {isBest && (
                              <div className="flex items-center mt-1 text-green-600 text-xs">
                                <TrophyOutlined className="mr-1" />
                                <span>Best Price</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Discount row */}
                  <tr
                    className={`border-b border-gray-200${highlightDifferences && hasDifferences(visibleProducts, "discount") ? " bg-blue-50" : ""}`}
                  >
                    <td className="p-4 font-medium text-gray-700 flex items-center">
                      <span>Discount</span>
                      <button
                        onClick={() => sortProducts("discount")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <ArrowUpOutlined />
                      </button>
                      {highlightDifferences && hasDifferences(visibleProducts, "discount") && (
                        <Tooltip title="Products differ on this feature">
                          <InfoCircleOutlined className="ml-2 text-blue-500" />
                        </Tooltip>
                      )}
                    </td>
                    {visibleProducts.map((product) => {
                      const isBest = getBestValue(visibleProducts, "discount").includes(product.id)
                      const savings = calculateSavings(product)

                      return (
                        <td
                          key={`${product.id}-discount`}
                          className={`p-4 text-center${isBest && product.discount > 0 ? " bg-green-50" : ""}`}
                        >
                          {product.discount > 0 ? (
                            <div className="flex flex-col items-center">
                              <span className="font-medium text-red-600">
                                {product.discount_type === "percentage"
                                  ? `${product.discount}%`
                                  : `$${product.discount}`}
                              </span>
                              <span className="text-xs text-gray-600">Save ${savings.toFixed(2)}</span>

                              {isBest && (
                                <div className="flex items-center mt-1 text-green-600 text-xs">
                                  <TrophyOutlined className="mr-1" />
                                  <span>Best Discount</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500">No discount</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>

                  {/* Final Price row */}
                  <tr
                    className={`border-b border-gray-200${highlightDifferences && hasDifferences(visibleProducts, "final_price") ? " bg-blue-50" : ""}`}
                  >
                    <td className="p-4 font-medium text-gray-700 flex items-center">
                      <span>Final Price</span>
                      <button
                        onClick={() => sortProducts("final_price")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <ArrowUpOutlined />
                      </button>
                      {highlightDifferences && hasDifferences(visibleProducts, "final_price") && (
                        <Tooltip title="Products differ on this feature">
                          <InfoCircleOutlined className="ml-2 text-blue-500" />
                        </Tooltip>
                      )}
                    </td>
                    {visibleProducts.map((product) => {
                      const isBest = getBestValue(visibleProducts, "final_price").includes(product.id)

                      return (
                        <td
                          key={`${product.id}-final-price`}
                          className={`p-4 text-center${isBest ? " bg-green-50" : ""}`}
                        >
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-lg text-blue-600">${product.final_price.toFixed(2)}</span>

                            {isBest && (
                              <div className="flex items-center mt-1 text-green-600 text-xs">
                                <TrophyOutlined className="mr-1" />
                                <span>Best Value</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                </>
              )}

              {/* Attributes Section */}
              <SectionDropdown
                section="attributes"
                expanded={isSectionExpanded("attributes")}
                onToggle={toggleSection}
              >
                <span colSpan={visibleProducts.length + 1}>Attributes</span>
              </SectionDropdown>
              {isSectionExpanded("attributes") &&
                getAllAttributeNames(visibleProducts).map((attrName) => {
                  const fieldName = `attr_${attrName}`
                  const hasDiff = hasDifferences(visibleProducts, fieldName)

                  return (
                    <tr
                      key={`attr-${attrName}`}
                      className={`border-b border-gray-200${highlightDifferences && hasDiff ? " bg-blue-50" : ""}`}
                    >
                      <td className="p-4 font-medium text-gray-700 flex items-center capitalize">
                        <span>{attrName}</span>
                        <button
                          onClick={() => sortProducts(fieldName)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <ArrowUpOutlined />
                        </button>
                        {highlightDifferences && hasDiff && (
                          <Tooltip title="Products differ on this feature">
                            <InfoCircleOutlined className="ml-2 text-blue-500" />
                          </Tooltip>
                        )}
                      </td>
                      {visibleProducts.map((product) => {
                        const attribute = product.attributes.find((attr) => attr.name === attrName)

                        return (
                          <td key={`${product.id}-attr-${attrName}`} className="p-4 text-center">
                            {attribute ? (
                              <div className="flex flex-wrap gap-1 justify-center">
                                {attrName === "color"
                                  ? // Color display
                                    attribute.values.map((value, idx) => (
                                      <div
                                        key={idx}
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{ backgroundColor: value.toLowerCase() }}
                                        title={value}
                                      />
                                    ))
                                  : // Other attributes
                                    attribute.values.map((value, idx) => (
                                      <Badge key={idx} color="blue" count={value} style={{ backgroundColor: "#f0f0f0", color: "#333" }} />
                                    ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}

              {/* Specifications Section */}
              {getAllSpecificationNames(visibleProducts).length > 0 && (
                <>
                  <SectionDropdown
                    section="specifications"
                    expanded={isSectionExpanded("specifications")}
                    onToggle={toggleSection}
                  >
                    <span colSpan={visibleProducts.length + 1}>Specifications</span>
                  </SectionDropdown>
                  {isSectionExpanded("specifications") &&
                    getAllSpecificationNames(visibleProducts).map((specName) => {
                      const fieldName = `spec_${specName}`
                      const hasDiff = hasDifferences(visibleProducts, fieldName)
                      const bestValues = getBestValue(visibleProducts, fieldName)

                      return (
                        <tr
                          key={`spec-${specName}`}
                          className={`border-b border-gray-200${highlightDifferences && hasDiff ? " bg-blue-50" : ""}`}
                        >
                          <td className="p-4 font-medium text-gray-700 flex items-center capitalize">
                            <span>{specName.replace(/([A-Z])/g, " $1").trim()}</span>
                            <button
                              onClick={() => sortProducts(fieldName)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              <ArrowUpOutlined />
                            </button>
                            {highlightDifferences && hasDiff && (
                              <Tooltip title="Products differ on this feature">
                                <InfoCircleOutlined className="ml-2 text-blue-500" />
                              </Tooltip>
                            )}
                          </td>
                          {visibleProducts.map((product) => {
                            const value = product.specifications?.[specName]
                            const isBest = bestValues.includes(product.id)

                            return (
                              <td
                                key={`${product.id}-spec-${specName}`}
                                className={`p-4 text-center${isBest ? " bg-green-50" : ""}`}
                              >
                                {value !== undefined ? (
                                  <div className="flex flex-col items-center">
                                    {typeof value === "boolean" ? (
                                      value ? (
                                        <div className="flex flex-col items-center">
                                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckOutlined className="text-green-600" />
                                          </div>
                                          <span className="mt-1 text-xs text-green-600">Yes</span>
                                        </div>
                                      ) : (
                                        <div className="flex flex-col items-center">
                                          <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                                            <CloseOutlined className="text-red-600" />
                                          </div>
                                          <span className="mt-1 text-xs text-red-600">No</span>
                                        </div>
                                      )
                                    ) : (
                                      <span className="font-medium">{value}</span>
                                    )}

                                    {isBest && (
                                      <div className="flex items-center mt-1 text-green-600 text-xs">
                                        <TrophyOutlined className="mr-1" />
                                        <span>Best</span>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                </>
              )}

              {/* Shipping Section */}
              <SectionDropdown
                section="shipping"
                expanded={isSectionExpanded("shipping")}
                onToggle={toggleSection}
              >
                <span colSpan={visibleProducts.length + 1}>Shipping & Availability</span>
              </SectionDropdown>
              {isSectionExpanded("shipping") && (
                <>
                  {/* Free Shipping row */}
                  <tr
                    className={`border-b border-gray-200${highlightDifferences && hasDifferences(visibleProducts, "free_shipping") ? " bg-blue-50" : ""}`}
                  >
                    <td className="p-4 font-medium text-gray-700 flex items-center">
                      <span>Free Shipping</span>
                      <button
                        onClick={() => sortProducts("free_shipping")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <ArrowUpOutlined />
                      </button>
                      {highlightDifferences && hasDifferences(visibleProducts, "free_shipping") && (
                        <Tooltip title="Products differ on this feature">
                          <InfoCircleOutlined className="ml-2 text-blue-500" />
                        </Tooltip>
                      )}
                    </td>
                    {visibleProducts.map((product) => {
                      const isBest = getBestValue(visibleProducts, "free_shipping").includes(product.id)

                      return (
                        <td
                          key={`${product.id}-free-shipping`}
                          className={`p-4 text-center${isBest ? " bg-green-50" : ""}`}
                        >
                          {product.free_shipping ? (
                            <div className="flex flex-col items-center">
                              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckOutlined className="text-green-600" />
                              </div>
                              <span className="mt-1 text-xs text-green-600">Free</span>

                              {isBest && (
                                <div className="flex items-center mt-1 text-green-600 text-xs">
                                  <TrophyOutlined className="mr-1" />
                                  <span>Best</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="font-medium">${product.shipping_charge.toFixed(2)}</span>
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>

                  {/* Shipping Days row */}
                  <tr
                    className={`border-b border-gray-200${highlightDifferences && hasDifferences(visibleProducts, "shipping_days") ? " bg-blue-50" : ""}`}
                  >
                    <td className="p-4 font-medium text-gray-700 flex items-center">
                      <span>Delivery Time</span>
                      <button
                        onClick={() => sortProducts("shipping_days")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <ArrowUpOutlined />
                      </button>
                      {highlightDifferences && hasDifferences(visibleProducts, "shipping_days") && (
                        <Tooltip title="Products differ on this feature">
                          <InfoCircleOutlined className="ml-2 text-blue-500" />
                        </Tooltip>
                      )}
                    </td>
                    {visibleProducts.map((product) => {
                      const isBest = getBestValue(visibleProducts, "shipping_days").includes(product.id)

                      return (
                        <td
                          key={`${product.id}-shipping-days`}
                          className={`p-4 text-center${isBest ? " bg-green-50" : ""}`}
                        >
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{product.shipping_days} days</span>

                            {isBest && (
                              <div className="flex items-center mt-1 text-green-600 text-xs">
                                <TrophyOutlined className="mr-1" />
                                <span>Fastest</span>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  {/* Cash on Delivery row */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-700">Cash on Delivery</td>
                    {visibleProducts.map((product) => (
                      <td key={`${product.id}-cod`} className="p-4 text-center">
                        {product.cash_on_delivery ? (
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckOutlined className="text-green-600" />
                            </div>
                            <span className="mt-1 text-xs text-green-600">Available</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                              <CloseOutlined className="text-red-600" />
                            </div>
                            <span className="mt-1 text-xs text-red-600">Not Available</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Stock row */}
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium text-gray-700">Stock</td>
                    {visibleProducts.map((product) => {
                      const stockLevel = product.quantity > 20 ? "high" : product.quantity > 10 ? "medium" : "low"

                      return (
                        <td key={`${product.id}-stock`} className="p-4 text-center">
                          {product.show_stock ? (
                            <div className="flex flex-col items-center">
                              <span
                                className={
                                  "font-medium" +
                                  (stockLevel === "high" ? " text-green-600" : "") +
                                  (stockLevel === "medium" ? " text-yellow-600" : "") +
                                  (stockLevel === "low" ? " text-red-600" : "")
                                }
                              >
                                {product.stock ? (
                                  <>
                                    {stockLevel === "high" && "In Stock"}
                                    {stockLevel === "medium" && "Limited Stock"}
                                    {stockLevel === "low" && "Low Stock"}
                                  </>
                                ) : (
                                  "Out of Stock"
                                )}
                              </span>
                              {product.quantity > 0 && (
                                <span className="text-xs text-gray-600">{product.quantity} available</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500">{product.stock ? "Available" : "Unavailable"}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

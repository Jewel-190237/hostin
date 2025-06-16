"use client"

import { useState } from "react"

export default function CheckoutPage() {
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [shippingMethod, setShippingMethod] = useState("local")
  const [paymentMethod, setPaymentMethod] = useState("stripe")

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Shipping Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-orange-400 rounded-full text-white text-sm flex items-center justify-center mr-3 font-medium">
                  1
                </div>
                <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                Account: <span className="text-blue-600 cursor-pointer">Right-shop@gmail.com</span>{" "}
                <span className="text-blue-600 cursor-pointer">Logout</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="right-shop@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+8801751070707"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                  Same as shipping information
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment method</h2>
              <div className="mb-4 text-sm text-gray-600">Choose your payment method</div>

              {/* Payment Options Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="text-blue-600 font-bold text-sm">stripe</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="text-blue-600 font-bold text-sm">PayPal</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="text-orange-500 font-bold text-sm">amazon</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="text-blue-600 font-bold text-sm">razorpay</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="text-blue-600 font-bold text-sm">mollie</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="text-2xl">💳</div>
                </div>
              </div>

              {/* Payment Method Options */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="payment"
                    id="bank-transfer"
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <label htmlFor="bank-transfer" className="text-sm font-medium text-gray-900">
                      Bank transfer
                    </label>
                    <div className="text-xs text-gray-600 mt-1">
                      Please use your Order ID as the payment reference. Your order will not be shipped until the funds
                      have cleared in our account.
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="razorpay"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="razorpay" className="ml-3 text-sm text-gray-900">
                    Payment with Razorpay
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="paypal"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="paypal" className="ml-3 text-sm text-gray-900">
                    Payment with Paypal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    id="bitconnect"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="bitconnect" className="ml-3 text-sm text-gray-900">
                    Payment with Bitconnect
                  </label>
                </div>
              </div>

              {/* Order Notes */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Order notes</label>
                <textarea
                  rows={3}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              {/* Privacy Policy */}
              <div className="mt-4 flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="ml-2 text-xs text-gray-600">
                  I have read and agree to the website terms and conditions *
                </label>
              </div>

              <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Continue
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Products */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Products</h2>
              <div className="space-y-4">
                {/* Smart Home Speaker */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-orange-500 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Smart Home Speaker</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">-</button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">$49.00</span>
                </div>

                {/* Headphones Ultra Bass */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Headphones Ultra Bass</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">-</button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">$23.17</span>
                </div>

                {/* Global Drone */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-orange-600 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Global Drone</div>
                      <div className="text-xs text-gray-500">1 Year Warranty</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">-</button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">$49.00</span>
                </div>

                {/* Smart Bluetooth Headphones */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Smart - Bluetooth headphones</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">-</button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">$16.67</span>
                </div>

                {/* Camera Samsung */}
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-600 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Camera Samsung for original</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">-</button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">$43.67</span>
                </div>

                {/* Macbook Pro */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-800 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">Macbook Pro 2018</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">-</button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 border border-gray-300 rounded text-xs hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">$16.17</span>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Shipping method:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      id="local-pickup"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="local-pickup" className="ml-2 text-sm text-gray-900">
                      Local Pickup - <span className="text-blue-600">Free shipping</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      id="fast-pickup"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="fast-pickup" className="ml-2 text-sm text-gray-900">
                      Fast Pickup
                    </label>
                  </div>
                  <span className="text-sm text-gray-900">$30.00</span>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">$1,865.49</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax:</span>
                  <span className="text-gray-900">$6.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Fee:</span>
                  <span className="text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">$1,865.49</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Promotional Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* SMARTPOINT */}
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs opacity-75 mb-1">🔌 SMARTPOINT</div>
                <div className="font-bold text-lg">$199.00</div>
                <div className="text-xs opacity-90">Smart device for all devices</div>
              </div>
              <button className="bg-white text-blue-500 hover:bg-gray-100 font-medium py-1 px-3 rounded text-sm transition-colors">
                BUY
              </button>
            </div>
          </div>

          {/* ANTIVIRUSPROT */}
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs opacity-75 mb-1">🛡️ ANTIVIRUSPROT</div>
                <div className="font-bold text-lg">$99.00</div>
                <div className="text-xs opacity-90">Antivirus protection for all devices</div>
              </div>
              <button className="bg-white text-green-500 hover:bg-gray-100 font-medium py-1 px-3 rounded text-sm transition-colors">
                BUY
              </button>
            </div>
          </div>

          {/* LAPTOPCONNECT */}
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs opacity-75 mb-1">📶 LAPTOPCONNECT</div>
                <div className="font-bold text-lg">$79.00</div>
                <div className="text-xs opacity-90">Enhanced WiFi for all devices</div>
              </div>
              <button className="bg-white text-purple-500 hover:bg-gray-100 font-medium py-1 px-3 rounded text-sm transition-colors">
                BUY
              </button>
            </div>
          </div>

          {/* PROTECTIONPLAN */}
          <div className="bg-orange-500 text-white p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs opacity-75 mb-1">🛡️ PROTECTIONPLAN</div>
                <div className="font-bold text-lg">$299.00</div>
                <div className="text-xs opacity-90">Insurance & theft for all devices</div>
              </div>
              <button className="bg-white text-orange-500 hover:bg-gray-100 font-medium py-1 px-3 rounded text-sm transition-colors">
                BUY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

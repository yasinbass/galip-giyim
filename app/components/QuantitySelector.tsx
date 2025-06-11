'use client'

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (newQuantity: number) => void
  min?: number
  max?: number
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={`p-1 rounded-md ${
          quantity <= min
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}
        aria-label="Ürün adedini azalt"
      >
        <MinusIcon className="h-4 w-4" />
      </button>

      <span className="w-8 text-center text-sm font-medium text-gray-900">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={`p-1 rounded-md ${
          quantity >= max
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}
        aria-label="Ürün adedini artır"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
} 
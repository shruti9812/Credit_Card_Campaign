import classNames from 'classnames'
import React from 'react'
import { Navigate } from 'react-router-dom'

const popularProducts = [
	{
		id: '3432',
		product_name: 'Holiday Season Spectacular'
	},
	{
		id: '7633',
		product_name: 'Summer Savings Bonanza'
		
	},
	{
		id: '6534',
		product_name: 'Back-to-School Blowout'
	},
	{
		id: '9234',
		product_name: 'Spring Fever Sale'
	},
	{
		id: '4314',
		product_name: 'Black Friday Madness'
		
	},
	{
		id: '4342',
		product_name: 'Cyber Monday Extravaganza'
		
	}
]

function PopularProducts() {
	return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Popular Campaigns </strong>
			<div className="mt-4 flex flex-col gap-3">
				{popularProducts.map((product) => (						
					<div className="ml-4 flex-1" key={product.id}>
						<p className="text-sm text-gray-800">***{product.product_name}***</p>						
					</div>
				))}
			</div>
		</div>
	)
}

export default PopularProducts

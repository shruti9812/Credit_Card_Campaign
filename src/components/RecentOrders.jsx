import React from 'react'
import { format } from 'date-fns'
// import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'

const recentOrderData = [
	{
		id: 1,
		campaignTitle: 'Summer Sale Campaign',
		campaignStartDate: '2024-06-01',
		campaignEndDate: '2024-06-30',
		cardType: 'Visa',
		campaignBudget: '$5000',
		TransactionType: 'Online'
	  },
	  {
		id: 2,
		campaignTitle: 'Back to School Promotion',
		campaignStartDate: '2024-08-15',
		campaignEndDate: '2024-09-15',
		cardType: 'Mastercard',
		campaignBudget: '$3000',
		TransactionType: 'In-store'
	  },
	  {
		id: 3,
		campaignTitle: 'Winter Clearance Sale',
		campaignStartDate: '2024-12-01',
		campaignEndDate: '2024-12-31',
		cardType: 'American Express',
		campaignBudget: '$7000',
		TransactionType: 'Online'
	  },
	  {
		id: 4,
		campaignTitle: 'New Year Special',
		campaignStartDate: '2024-12-25',
		campaignEndDate: '2025-01-01',
		cardType: 'Discover',
		campaignBudget: '$2000',
		TransactionType: 'In-store'
	  },
	  {
		id: 5,
		campaignTitle: 'Black Friday Deals',
		campaignStartDate: '2024-11-29',
		campaignEndDate: '2024-11-30',
		cardType: 'JCB',
		campaignBudget: '$10000',
		TransactionType: 'Online'
	  }
]

export default function RecentOrders() {
	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">Campaign Information</strong>
			<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-gray-700">
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Card Type</th>
							<th>Budget</th>
							<th>Transaction Type</th>
						</tr>
					</thead>
					<tbody>
						{recentOrderData.map((order) => (
							<tr key={order.id}>
								{/* <td>
									<Link to={`/order/${order.id}`}>#{order.id}</Link>
								</td>
								<td>
									<Link to={`/product/${order.campaignTitle}`}>{order.campaignTitle}</Link>
								</td>
								<td>
									<Link to={`/customer/${order.campaignStartDate}`}>{order.campaignStartDate}</Link>
								</td> */}
						
								<td>{order.campaignEndDate}</td>
								<td>{order.cardType}</td>
								<td>{order.campaignBudget}</td>
								<td>{order.TransactionType}</td>
								
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

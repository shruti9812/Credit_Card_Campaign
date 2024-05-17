import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		MinCashback: 4000,
		MaxCashback: 2400
	},
	{
		name: 'Feb',
		MinCashback: 3000,
		MaxCashback: 1398
	},
	{
		name: 'Mar',
		MinCashback: 2000,
		MaxCashback: 9800
	},
	{
		name: 'Apr',
		MinCashback: 2780,
		MaxCashback: 3908
	},
	{
		name: 'May',
		MinCashback: 1890,
		MaxCashback: 4800
	},
	{
		name: 'Jun',
		MinCashback: 2390,
		MaxCashback: 3800
	},
	{
		name: 'July',
		MinCashback: 3490,
		MaxCashback: 4300
	},
	{
		name: 'Aug',
		MinCashback: 2000,
		MaxCashback: 9800
	},
	{
		name: 'Sep',
		MinCashback: 2780,
		MaxCashback: 3908
	},
	{
		name: 'Oct',
		MinCashback: 1890,
		MaxCashback: 4800
	},
	{
		name: 'Nov',
		MinCashback: 2390,
		MaxCashback: 3800
	},
	{
		name: 'Dec',
		MinCashback: 3490,
		MaxCashback: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium"></strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="MaxCashback" fill="#0ea5e9" />
						<Bar dataKey="MinCashback" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

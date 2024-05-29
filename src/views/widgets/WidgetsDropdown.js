import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { useSelector } from 'react-redux'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const [data,setData] = useState([
    {
      "CampaignNumber": 1,
      "CampaignTitle": "Swiggy – No order too small, IPL 2018",
      "CampaignBudget": 10000000,
      "CampaignStartDate": "2018-07-01T00:00:00",
      "CampaignEndDate": "2018-08-30T00:00:00",
      "CardType": "RuPay Credit Card",
      "TransactionType": "online",
      "NotEligibleTransactionType": "NA",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 50,
      "MaxCashbackOverall": 400,
      "MaxCashbackPerTransaction": 1000,
      "Frequency": 1,
      "AdditionalField": ""
    },
    {
      "CampaignNumber": 2,
      "CampaignTitle": "Zomato Premier League, IPL 2019",
      "CampaignBudget": 5000000,
      "CampaignStartDate": "2019-03-24T00:00:00",
      "CampaignEndDate": "2019-04-24T00:00:00",
      "CardType": "Tata Neu RuPay Credit Card",
      "TransactionType": "online",
      "NotEligibleTransactionType": "NA",
      "MinOverallTransactionAmount": 3000,
      "MinCashbackAmount": 100,
      "MaxCashbackOverall": 300,
      "MaxCashbackPerTransaction": 1200,
      "Frequency": 1,
      "AdditionalField": ""
    },
    {
      "CampaignNumber": 3,
      "CampaignTitle": "IPL 2024",
      "CampaignBudget": 50000000,
      "CampaignStartDate": null,
      "CampaignEndDate": null,
      "CardType": null,
      "TransactionType": null,
      "NotEligibleTransactionType": null,
      "MinOverallTransactionAmount": null,
      "MinCashbackAmount": null,
      "MaxCashbackOverall": null,
      "MaxCashbackPerTransaction": null,
      "Frequency": null,
      "AdditionalField": null
    },
    {
      "CampaignNumber": 4,
      "CampaignTitle": "ABC Campaign",
      "CampaignBudget": 60000000,
      "CampaignStartDate": null,
      "CampaignEndDate": null,
      "CardType": null,
      "TransactionType": null,
      "NotEligibleTransactionType": null,
      "MinOverallTransactionAmount": null,
      "MinCashbackAmount": null,
      "MaxCashbackOverall": null,
      "MaxCashbackPerTransaction": null,
      "Frequency": null,
      "AdditionalField": null
    },
    {
      "CampaignNumber": 5,
      "CampaignTitle": "abc3",
      "CampaignBudget": 60000000,
      "CampaignStartDate": null,
      "CampaignEndDate": null,
      "CardType": null,
      "TransactionType": null,
      "NotEligibleTransactionType": null,
      "MinOverallTransactionAmount": null,
      "MinCashbackAmount": null,
      "MaxCashbackOverall": null,
      "MaxCashbackPerTransaction": null,
      "Frequency": null,
      "AdditionalField": null
    },
    {
      "CampaignNumber": 6,
      "CampaignTitle": "abc5",
      "CampaignBudget": 60000000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 2",
      "TransactionType": "7000000",
      "NotEligibleTransactionType": "COD",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 100,
      "MaxCashbackOverall": 1200,
      "MaxCashbackPerTransaction": 200,
      "Frequency": 1,
      "AdditionalField": "na"
    },
    {
      "CampaignNumber": 7,
      "CampaignTitle": "xyz",
      "CampaignBudget": 30000000,
      "CampaignStartDate": null,
      "CampaignEndDate": null,
      "CardType": "Card 2",
      "TransactionType": "online",
      "NotEligibleTransactionType": "cod",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 50,
      "MaxCashbackOverall": 1200,
      "MaxCashbackPerTransaction": 100,
      "Frequency": 1,
      "AdditionalField": "na"
    },
    {
      "CampaignNumber": 8,
      "CampaignTitle": "Test 1",
      "CampaignBudget": 30000000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 2",
      "TransactionType": "online",
      "NotEligibleTransactionType": "cod",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 50,
      "MaxCashbackOverall": 1200,
      "MaxCashbackPerTransaction": 100,
      "Frequency": 1,
      "AdditionalField": "na"
    },
    {
      "CampaignNumber": 9,
      "CampaignTitle": "Test 3",
      "CampaignBudget": 30000000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 2",
      "TransactionType": "online",
      "NotEligibleTransactionType": "cod",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 50,
      "MaxCashbackOverall": 1200,
      "MaxCashbackPerTransaction": 100,
      "Frequency": 1,
      "AdditionalField": ""
    },
    {
      "CampaignNumber": 10,
      "CampaignTitle": "abc4",
      "CampaignBudget": 2000000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 1",
      "TransactionType": "online",
      "NotEligibleTransactionType": "cod",
      "MinOverallTransactionAmount": 12000,
      "MinCashbackAmount": 10000,
      "MaxCashbackOverall": 20000,
      "MaxCashbackPerTransaction": 200,
      "Frequency": 1,
      "AdditionalField": ""
    },
    {
      "CampaignNumber": 11,
      "CampaignTitle": "ABC",
      "CampaignBudget": 9000000,
      "CampaignStartDate": "2018-07-01T00:00:00",
      "CampaignEndDate": "2018-07-01T00:00:00",
      "CardType": "online",
      "TransactionType": "ABC",
      "NotEligibleTransactionType": "ABC",
      "MinOverallTransactionAmount": 400,
      "MinCashbackAmount": 700,
      "MaxCashbackOverall": 500,
      "MaxCashbackPerTransaction": 400,
      "Frequency": 5,
      "AdditionalField": "NA"
    },
    {
      "CampaignNumber": 12,
      "CampaignTitle": "abc12",
      "CampaignBudget": 400000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-30T00:00:00",
      "CardType": "Card 1",
      "TransactionType": "",
      "NotEligibleTransactionType": "22222",
      "MinOverallTransactionAmount": 1233,
      "MinCashbackAmount": 123,
      "MaxCashbackOverall": 333,
      "MaxCashbackPerTransaction": 111,
      "Frequency": 1,
      "AdditionalField": "na"
    },
    {
      "CampaignNumber": 13,
      "CampaignTitle": "abc14",
      "CampaignBudget": 400000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 1",
      "TransactionType": "11222",
      "NotEligibleTransactionType": "22222",
      "MinOverallTransactionAmount": 1233,
      "MinCashbackAmount": 123,
      "MaxCashbackOverall": 333,
      "MaxCashbackPerTransaction": 111,
      "Frequency": 1,
      "AdditionalField": "na"
    },
    {
      "CampaignNumber": 14,
      "CampaignTitle": "abc31",
      "CampaignBudget": 120000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 2",
      "TransactionType": "online",
      "NotEligibleTransactionType": "COD",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 50,
      "MaxCashbackOverall": 1200,
      "MaxCashbackPerTransaction": 1200,
      "Frequency": 1,
      "AdditionalField": "na"
    },
    {
      "CampaignNumber": 15,
      "CampaignTitle": "abc32",
      "CampaignBudget": 120000,
      "CampaignStartDate": "2024-05-01T00:00:00",
      "CampaignEndDate": "2024-05-31T00:00:00",
      "CardType": "Card 2",
      "TransactionType": "online",
      "NotEligibleTransactionType": "COD",
      "MinOverallTransactionAmount": 5000,
      "MinCashbackAmount": 50,
      "MaxCashbackOverall": 1200,
      "MaxCashbackPerTransaction": 1200,
      "Frequency": 1,
      "AdditionalField": ""
    }
  ])
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])




  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {data.length}
              <span className="fs-6 fw-normal">
                {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
              </span>
            </>
          }
          title="Total Campaign"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          //       <CIcon icon={cilOptions} />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              {data.reduce((n, {CampaignBudget}) => n + CampaignBudget, 0)}
              <span className="fs-6 fw-normal">
                {/* (40.9% <CIcon icon={cilArrowTop} />) */}
              </span>
            </>
          }
          title="Total Campaign Budget"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          //       <CIcon icon={cilOptions} />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              2.49%{' '}
              <span className="fs-6 fw-normal">
                {/* (84.7% <CIcon icon={cilArrowTop} />) */}
              </span>
            </>
          }
          title="Conversion Rate"
          // action={
          //   <CDropdown alignment="end">
          //     <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
          //       <CIcon icon={cilOptions} />
          //     </CDropdownToggle>
          //     <CDropdownMenu>
          //       <CDropdownItem>Action</CDropdownItem>
          //       <CDropdownItem>Another action</CDropdownItem>
          //       <CDropdownItem>Something else here...</CDropdownItem>
          //       <CDropdownItem disabled>Disabled action</CDropdownItem>
          //     </CDropdownMenu>
          //   </CDropdown>
          // }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              44K{' '}
              <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Sessions"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol> */}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown

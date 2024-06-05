import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { arrayJSON } from '../../data'
import axios from 'axios';
const Dashboard = () => {
  const hasReloaded = localStorage.getItem('hasReloaded');
  const [data,setData] = useState([])
  useEffect(() => {
  
    if (!hasReloaded) {
      // If the page hasn't been reloaded, reload it
      localStorage.setItem('hasReloaded', true);
      window.location.reload();
    } else {
      // If the page has been reloaded already, remove the flag
      localStorage.removeItem('hasReloaded');
    }
    callTheApi()
  }, [hasReloaded]);

const callTheApi  =async ()=>{
let response = await axios.get('http://localhost:8000/items'); 
response !== null && response!== undefined && response.length>0 && setData([...response])
}

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
       
        
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      {/* <CIcon icon={cilPeople} /> */}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Campaign Title</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                    Campaign Budget 
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Campaign Start Date</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                    Campaign End Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">CardType</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">TransactionType</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                         {`#${Number(index)+1}`}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.CampaignTitle}</div>
                        <div className="small text-body-secondary text-nowrap">
                         
                          
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      {item.CampaignBudget}
                      
                      </CTableDataCell>
                      <CTableDataCell>
                      {item.CampaignStartDate}
                     
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="xl" icon={item.payment.icon} /> */}
                        {item.CampaignEndDate}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.CardType}
                        {/* <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.TransactionType}
                        {/* <div className="fw-semibold text-nowrap">{item.activity}</div> */}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

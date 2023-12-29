import React, { useState, useEffect } from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'
import { getReports } from '../../services/doctorService'

import { Buffer } from 'buffer'

const DocReportsPage = () => {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        const func = async () => {
            await getReports().then((res) => {
                console.log(res);
                setReports(res.data)
                setLoading(false)
            })
        }
        func()
    }, [])


    return (
        <SideDrawer>
            {reports?.map((image) => {
            
                return (
                    <img src={`data:image/jpeg;base64,${image?.reports}`} height="50%" width="50%" />
                )
            })}
        </SideDrawer>
    )
}
export default DocReportsPage
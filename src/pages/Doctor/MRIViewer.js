import React from 'react'
import SideDrawer from '../../components/sidebar/Sidebar'

const MRIViewer = () => {
    return (
        <SideDrawer>

            <iframe
                src="http://mri-viewer.opensource.epam.com/"
                title="W3Schools Free Online Web Tutorials"
                width="100%"
                height="1000"
            ></iframe>
        </SideDrawer>
    )
}

export default MRIViewer
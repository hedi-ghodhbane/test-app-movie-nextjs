import React from 'react'
import Image from 'next/image'
const logoUrl = "https://image.winudf.com/v2/image1/Y29tLmRldmVsb3BlcnhwbG9pdC5tb3ZpZV9pY29uXzE1ODc3OTQxMTBfMDU2/icon.png?w=&fakeurl=1";
function Layout(props:any) {
    return (
        <div className="container">
            <Image src={logoUrl} className="logo" alt="website logo"/>
<h1 className="title">{props.title}</h1>

{props.children}
        </div>
    )
}

export default Layout

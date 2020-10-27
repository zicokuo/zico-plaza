//  Footer 脚部

import React from "react"
import tw, { styled } from "twin.macro"
import Bio from './bio'

const FooterWidget = () => {
    const Footer = styled.div`${tw`flex flex-col max-w-xl m-auto justify-items-center items-center`}`

    return (
        <footer tw="divide-gray-500">
            <Footer >
                <Bio ></Bio>
                © {new Date().getFullYear()}, Built with 
                <a href="https://www.gatsbyjs.com">Gatsby</a>
            </Footer>
        </footer>

    )
}

export default FooterWidget
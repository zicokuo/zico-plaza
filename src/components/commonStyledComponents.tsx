import tw, { styled } from "twin.macro"

export const Div = styled.style(props => ({
  color: props?.textColor ?? props?.theme.textColor ?? `white`,
  background: props?.background ?? props?.theme.background ?? `transparent`,
}))

export const PcOnly = styled.div`
  ${tw`mobile:hidden md:relative`}
`
export const MobileOnly = styled.div`
  ${tw`mobile:relative md:hidden lg:hidden xl:hidden`}
`

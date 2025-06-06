import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgArrowIosForwardOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#arrow-ios-forward-outline_svg__a)'}>
      <path
        d={
          'M10 19a1 1 0 0 1-.77-1.64L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'arrow-ios-forward-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgArrowIosForwardOutline)
const Memo = memo(ForwardRef)

export default Memo

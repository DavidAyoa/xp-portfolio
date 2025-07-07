import React from "react";

const WindowsIcon: React.FC = () => (
  <svg
    data-v-8ec79786=""
    className="items-center mt-1"
    width="28px"
    height="100%"
    viewBox="0 0 29 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g
      filter="url(#filter0_d_116_277)"
      data-v-inspector="src/components/icons/WindowsIcon.vue:3:5"
    >
      <path
        d="M27 0H2V20H27V0Z"
        fill="url(#pattern0)"
        shapeRendering="crispEdges"
        data-v-inspector="src/components/icons/WindowsIcon.vue:4:7"
      ></path>
    </g>
    <defs data-v-inspector="src/components/icons/WindowsIcon.vue:6:5">
      <filter
        id="filter0_d_116_277"
        x="0"
        y="0"
        width="29"
        height="24"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
        data-v-inspector="src/components/icons/WindowsIcon.vue:7:7"
      >
        <feFlood
          floodOpacity="0"
          result="BackgroundImageFix"
          data-v-inspector="src/components/icons/WindowsIcon.vue:8:9"
        ></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
          data-v-inspector="src/components/icons/WindowsIcon.vue:9:9"
        ></feColorMatrix>
        <feOffset
          dy="2"
          data-v-inspector="src/components/icons/WindowsIcon.vue:10:9"
        ></feOffset>
        <feGaussianBlur
          stdDeviation="1"
          data-v-inspector="src/components/icons/WindowsIcon.vue:11:9"
        ></feGaussianBlur>
        <feComposite
          in2="hardAlpha"
          operator="out"
          data-v-inspector="src/components/icons/WindowsIcon.vue:12:9"
        ></feComposite>
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          data-v-inspector="src/components/icons/WindowsIcon.vue:13:9"
        ></feColorMatrix>
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_116_277"
          data-v-inspector="src/components/icons/WindowsIcon.vue:14:9"
        ></feBlend>
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_116_277"
          result="shape"
          data-v-inspector="src/components/icons/WindowsIcon.vue:15:9"
        ></feBlend>
      </filter>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
        data-v-inspector="src/components/icons/WindowsIcon.vue:17:7"
      >
        <use
          xlinkHref="#image0_116_277"
          transform="matrix(0.00390625 0 0 0.00439967 0 -0.0631579)"
          data-v-inspector="src/components/icons/WindowsIcon.vue:18:9"
        ></use>
      </pattern>
      <image
        id="image0_116_277"
        width="256"
        height="256"
        xlinkHref="/img/icons/windows-icon.webp"
        data-v-inspector="src/components/icons/WindowsIcon.vue:20:7"
      ></image>
    </defs>
  </svg>
);

export default WindowsIcon;

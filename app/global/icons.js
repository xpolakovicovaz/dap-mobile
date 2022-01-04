
import React from "react";
import {SvgXml} from "react-native-svg"
import {View} from 'react-native';

export function OK (color,size)
{
    /*
    const svgMarkup = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketchjs="https://sketch.io/dtd/"  width="32" height="32" viewBox="0 0 32 32" sketchjs:version="2021.4.25.11">
    <polyline sketchjs:tool="polyline" style="fill: none; stroke: ` + color + `; mix-blend-mode: source-over; stroke-dasharray: none; stroke-dashoffset: 0; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 2;" points="0,14.19 5.41,27.21 26.68,0 7.13,17.46 0,14.19 undefined,undefined" transform="matrix(1,0,0,1,3.1413604,2.5499138)"/>
    </svg>`;
    */
  /*
    const svgMarkup = `<Svg height="50%" width="50%" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="45"
      stroke="blue"
      strokeWidth="2.5"
      fill="green"
    />
    <Rect
      x="15"
      y="15"
      width="70"
      height="70"
      stroke="red"
      strokeWidth="2"
      fill="yellow"
    />
  </Svg>`;
    //const SvgImage = ()=> <SvgXml xml={svgMarkup} width={size} height={size}/>
    //return <SvgImage/>;

    return (<SvgXml xml={svgMarkup} width={size} height={size}/>)*/
//return (<View/>);
}

export function CANCEL (color,size)
{
    /*const svgMarkup = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketchjs="https://sketch.io/dtd/"  width="32" height="32" viewBox="0 0 32 32" sketchjs:version="2021.4.25.11">
    <polyline sketchjs:tool="polyline" style="fill: none; stroke: ` + color + `; mix-blend-mode: source-over; stroke-dasharray: none; stroke-dashoffset: 0; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 2;" points="0,0.49 8.85,15.41 1.15,26.07 11.31,18.36 26.56,27.21 14.26,14.92 27.05,0 11.97,12.62 0,0.49 undefined,undefined" transform="matrix(1,0,0,1,2.6229508196721314,2.295081967213115)"/>
    </svg>`;
    
    const SvgImage = ()=> <SvgXml xml={svgMarkup} width={size}/>
    return <SvgImage/>;

    */
   return (<View/>);
}

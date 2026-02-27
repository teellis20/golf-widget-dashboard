const svgToDataUrl = (svg) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    svg
      .replace(/<\?xml[^>]*\?>/g, "")
      .replace(/<!--[\s\S]*?-->/g, "")
  )}`;

export default function WeatherIcon({ svg, alt = "", className = "", size}) {
  if (!svg) return null;
  return (
    <img
      src={svgToDataUrl(svg)}
      alt={alt}
      width={size}
      height={size}
      className={className}
      draggable={false}
    />
  );
}
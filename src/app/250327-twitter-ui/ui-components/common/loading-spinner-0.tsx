export default function LoadingSpinner({
  size = "md",
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}): React.JSX.Element {
  const sizeClass = `loading-${size}`;

  return <span className={`loading loading-spinner ${sizeClass}`} />;
}

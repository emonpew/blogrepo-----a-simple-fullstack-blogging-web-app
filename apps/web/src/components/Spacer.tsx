export default function Spacer({
  dimension = 20,
  horizental = false,
}: {
  dimension?: number;
  horizental?: boolean;
}) {
  return (
    <div
      style={{
        height: horizental ? 0 : dimension,
        width: horizental ? dimension : 0,
      }}
    ></div>
  );
}

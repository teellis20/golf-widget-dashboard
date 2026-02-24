export function getCurrentAutoPin(
  pinRotationStart,
  rotationStartIndex,
  pinLocations,
) {

  if (!pinRotationStart) return null;
  if (!pinLocations?.length) return null;


  const totalPins = pinLocations.length;

  // Parse DATE safely as local date
  const [year, month, day] = pinRotationStart.split("-").map(Number);
  const startDate = new Date(year, month - 1, day);

  const today = new Date();
  const todayLocal = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffMs = todayLocal - startDate;
  const daysSinceStart = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Prevent negative rotation (if someone somehow sets a future date)
  const safeDays = Math.max(0, daysSinceStart);

  const index =
    (safeDays + rotationStartIndex) % totalPins;

  return pinLocations[index];
}
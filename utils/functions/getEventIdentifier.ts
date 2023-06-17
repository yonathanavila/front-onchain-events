export const EventIdentifier = (event_address: string, currentBlockBumber: number): string => {
  return (event_address + currentBlockBumber);
}
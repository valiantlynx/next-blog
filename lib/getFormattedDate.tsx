export default function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-NO', { dateStyle: 'long' }).format(new Date(dateString))
}
// this function is used to get the date in a readable format
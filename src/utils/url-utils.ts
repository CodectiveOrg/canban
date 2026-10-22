export function generatePictureUrl(picture: string): string {
  return `${import.meta.env.VITE_API_BASE_URL}/public/picture/user/${picture}`;
}

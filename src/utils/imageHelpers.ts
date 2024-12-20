export const getImageUrl = (binaryData: string): string => {
  if (binaryData) {
    const byteCharacters = atob(binaryData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    return url;
  }
  return "/piwo.jpg";
};

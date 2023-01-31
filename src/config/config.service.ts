
export const envConfig = {
  parkingLotSize: (): number => {
    return parseInt(process.env.PARKINGSIZE) || 5;
  }
};
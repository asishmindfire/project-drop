import { ConfigService } from '@nestjs/config';

export const envConfig = {
  parkingLotSize: () => {
    return parseInt(process.env.PARKINGSIZE) || 5;
  },
};
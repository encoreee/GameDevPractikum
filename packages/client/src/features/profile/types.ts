import { SerializedError } from '@reduxjs/toolkit';
import { User } from '@/infrastructure/api/auth/contracts';

export type ProfileState = {
  status: { profileStatus: string };
  profile?: User;
  error?: SerializedError | undefined;
};

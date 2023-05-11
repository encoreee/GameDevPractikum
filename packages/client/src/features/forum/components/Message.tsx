import Avatar from '@/components/Avatar';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { greenButtonStyles, smallTextStyles, userInfoStyles } from '../styles';
import { ThreadMessage } from '@/infrastructure/api/forum/types';
import { FC } from 'react';
import { formatDateFromUTCString } from '@/shared';

const Message: FC<ThreadMessage> = ({
  time,
  userName,
  userAvatar,
  message,
}) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Stack sx={userInfoStyles}>
          <Avatar src={userAvatar} />
          <Typography sx={smallTextStyles}>{userName}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <Stack>
          <Typography sx={smallTextStyles}>{message}</Typography>
          <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'}>
            <Button sx={{ ...greenButtonStyles, fontSize: '0.5rem' }}>
              Reply
            </Button>
            <Typography color={'primary.main'} fontSize={'0.5rem'}>
              {formatDateFromUTCString(time)}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Message;

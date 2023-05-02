import Avatar from '@/components/Avatar';
import { Grid, Stack, Typography } from '@mui/material';
import { smallTextStyles, userInfoStyles } from '../styles';

const Message = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Stack sx={userInfoStyles}>
          <Avatar src="defaultAvatar.svg"></Avatar>
          <Typography sx={smallTextStyles}>Semen Ivanov</Typography>
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <Typography sx={smallTextStyles}>
          {`If you're looking for a game that will transport you back to the
          golden age of gaming, look no further than [insert game name], a retro
          gem that's sure to delight fans of classic gaming. The first thing
          you'll notice about this game is the nostalgic graphics, which are a
          loving homage to the 8-bit era. The pixel art is vibrant and colorful,
          with each level featuring its own unique aesthetic. But don't be
          fooled by the old-school graphics - this game has plenty of modern
          touches that make it a blast to play`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Message;

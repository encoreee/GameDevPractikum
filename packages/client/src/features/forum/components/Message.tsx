import Avatar from '@/components/Avatar';
import { Grid, Stack, Typography } from '@mui/material';

const Message = () => {
  return (
    <Grid container sx={{ gap: '1rem' }}>
      <Grid item xs={2}>
        <Stack sx={userInfoStyle}>
          <Avatar src="defaultAvatar.svg"></Avatar>
          <Typography sx={smallText}>Semen Ivanov</Typography>
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Typography sx={smallText}>
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

const userInfoStyle = { alignItems: 'center', gap: '0.5rem' };
const smallText = { fontSize: '0.5rem', color: '#fff' };

export default Message;

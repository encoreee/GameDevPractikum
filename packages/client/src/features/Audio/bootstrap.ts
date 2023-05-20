import Audio from '@/features/Audio/Audio';
import playerShoot from '@/assets/sounds/shootPlayer.wav';
import shootEnemy from '@/assets/sounds/shootEnemy.wav';
import jump from '@/assets/sounds/jump.wav';
import ready1 from '@/assets/sounds/ready1.mp3';
import ready2 from '@/assets/sounds/ready2.mp3';
import ready3 from '@/assets/sounds/ready3.mp3';
import ready4 from '@/assets/sounds/ready4.mp3';
import explosionPlayer from '@/assets/sounds/explosionPlayer.wav';
import explosionEnemy from '@/assets/sounds/explosionEnemy.wav';
import mainTheme from '@/assets/sounds/mainTheme.mp3';
import gameTheme from '@/assets/sounds/gameTheme.mp3';
import { AUDIO_IDS } from './const';

export const audioBootstrap = () => {
  Audio.add(mainTheme, AUDIO_IDS.mainTheme);
  Audio.add(gameTheme, AUDIO_IDS.gameTheme);
  Audio.add(playerShoot, AUDIO_IDS.PlayerShoot);
  Audio.add(shootEnemy, AUDIO_IDS.EnemyShoot);
  Audio.add(explosionPlayer, AUDIO_IDS.PlayerExplosion);
  Audio.add(explosionEnemy, AUDIO_IDS.EnemyExplosion);
  Audio.add(jump, AUDIO_IDS.Jump);
  Audio.add(ready1, AUDIO_IDS.Ready1);
  Audio.add(ready2, AUDIO_IDS.Ready2);
  Audio.add(ready3, AUDIO_IDS.Ready3);
  Audio.add(ready4, AUDIO_IDS.Ready4);
  Audio.init();
};

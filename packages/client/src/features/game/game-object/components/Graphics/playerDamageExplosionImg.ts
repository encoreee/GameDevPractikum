import source from '../../../../../assets/explosion/playerDamageExplosion.png';
import { isServer } from '@/shared/helpers/serverHelper';

export let playerDamageExplosionImg: HTMLImageElement | undefined;
if (!isServer()) {
  const enemyExplosionImg = new Image();
  enemyExplosionImg.src = source;
  enemyExplosionImg.translate;
}

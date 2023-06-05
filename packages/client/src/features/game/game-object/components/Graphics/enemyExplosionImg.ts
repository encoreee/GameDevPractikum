import source from '../../../../../assets/explosion/explosion-sprite.png';
import { isServer } from '@/shared/helpers/serverHelper';

export let enemyExplosionImg: HTMLImageElement | undefined;
if (!isServer()) {
  const enemyExplosionImg = new Image();
  enemyExplosionImg.src = source;
  console.log('imageClient');
}

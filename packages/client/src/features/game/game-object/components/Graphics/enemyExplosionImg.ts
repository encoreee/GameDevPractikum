import source from '../../../../../assets/explosion/explosion-sprite.png';
import { isServer } from '@/shared/helpers/serverHelper';

let enemyExplosionImg: HTMLImageElement | undefined;
if (!isServer()) {
  const enemyExplosionImg = document.createElement('img');
  enemyExplosionImg.src = source;
}
export default enemyExplosionImg;

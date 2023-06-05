import source from '../../../../../assets/explosion/playerDamageExplosion.png';
import { isServer } from '@/shared/helpers/serverHelper';

let playerDamageExplosionImg: HTMLImageElement | undefined;
if (!isServer()) {
  const enemyExplosionImg = document.createElement('img');
  enemyExplosionImg.src = source;
}
export default playerDamageExplosionImg;

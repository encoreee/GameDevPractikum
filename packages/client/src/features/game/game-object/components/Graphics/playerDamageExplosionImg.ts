import source from '../../../../../assets/explosion/playerDamageExplosion.png';

let playerDamageExplosionImg: HTMLImageElement | undefined;

if (typeof document !== 'undefined') {
  playerDamageExplosionImg = document?.createElement('img');
  playerDamageExplosionImg.src = source;
}

export default playerDamageExplosionImg;

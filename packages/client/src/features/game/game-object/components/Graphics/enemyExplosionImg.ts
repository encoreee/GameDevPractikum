import source from '../../../../../assets/explosion/explosion-sprite.png';

let enemyExplosionImg: HTMLImageElement | undefined;

if (typeof document !== 'undefined') {
  enemyExplosionImg = document?.createElement('img');
  enemyExplosionImg.src = source;
}

export default enemyExplosionImg;

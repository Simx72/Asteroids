import AsteroidsScene from './scenes/templates/asteroids-scene';
import AsteroidsMainScene from './scenes/game-scene';
import AsteroidsLooseScene from './scenes/perder-scene';
var Scenes: (typeof AsteroidsScene)[] = [AsteroidsMainScene, AsteroidsLooseScene]
export default Scenes;
import Chip from '../module/chip.js';
import Circuit from '../module/circuit.js';
import Config from '../module/config.js';

var chipMain = new Chip('chipMain');
var config = new Config();
var circuit = new Circuit(chipMain, config);

import test from 'node:test';import assert from 'node:assert/strict';import {movement} from '../src/input.js';
test('diagonal input is normalized and opposing keys cancel',()=>{assert.equal(Math.hypot(...Object.values(movement(new Set(['w','d'])))),1);assert.deepEqual(movement(new Set(['a','d','w','s'])),{x:0,z:0});});
test('typing and pause block held movement',()=>assert.deepEqual(movement(new Set(['ArrowUp','d']),true),{x:0,z:0}));
test('keyboard and touch share arrow/WASD mapping',()=>assert.deepEqual(movement(new Set(['ArrowLeft'])),movement(new Set(['a']))));

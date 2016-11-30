var assert = require('assert');
var constants = require('../lib/protocol/constants');
var networks = require('../lib/protocol/networks');
var co = require('../lib/utils/co');
var BufferWriter = require('../lib/utils/writer');
var BufferReader = require('../lib/utils/reader');
var OldCoins = require('../lib/blockchain/coins-old');
var Coins = require('../lib/blockchain/coins');
var crypto = require('../lib/crypto/crypto');
var util = require('../lib/utils/util');
var LDB = require('../lib/db/ldb');
var BN = require('bn.js');
var DUMMY = new Buffer([0]);
var file = process.argv[2];
var options = {};
var db, batch, index;

assert(typeof file === 'string', 'Please pass in a database path.');

file = file.replace(/\.ldb\/?$/, '');

db = LDB({
  location: file,
  db: 'leveldb',
  compression: true,
  cacheSize: 16 << 20,
  writeBufferSize: 8 << 20,
  createIfMissing: false,
  bufferKeys: true
});

options = {};
options.spv = process.argv.indexOf('--spv') !== -1;
options.witness = process.argv.indexOf('--witness') !== -1;
options.prune = process.argv.indexOf('--prune') !== -1;
options.indexTX = process.argv.indexOf('--index-tx') !== -1;
options.indexAddress = process.argv.indexOf('--index-address') !== -1;
options.network = networks.main;

index = process.argv.indexOf('--network');

if (index !== -1) {
  options.network = networks[process.argv[index + 1]];
  assert(options.network, 'Invalid network.');
}

var updateVersion = co(function* updateVersion() {
  var data, ver;

  console.log('Checking version.');

  data = yield db.get('V');

  if (!data)
    throw new Error('No DB version found!');

  ver = data.readUInt32LE(0, true);

  if (ver !== 1)
    throw Error('DB is version ' + ver + '.');

  ver = new Buffer(4);
  ver.writeUInt32LE(2, 0, true);
  batch.put('V', ver);
});

var updateOptions = co(function* updateOptions() {
  if (yield db.has('O'))
    return;

  if (process.argv.indexOf('--network') === -1) {
    console.log('Warning: no options found in chaindb.');
    console.log('Make sure you selected the correct options');
    console.log('which may include any of:');
    console.log('`--network [name]`, `--spv`, `--witness`,');
    console.log('`--prune`, `--index-tx`, and `--index-address`.');
    console.log('Continuing migration in 5 seconds...');
    yield co.timeout(5000);
  }

  batch.put('O', defaultOptions());
});

var updateDeployments = co(function* updateDeployments() {
  if (yield db.has('v'))
    return;

  if (process.argv.indexOf('--network') === -1) {
    console.log('Warning: no deployment table found.');
    console.log('Make sure `--network` is set properly.');
    console.log('Continuing migration in 5 seconds...');
    yield co.timeout(5000);
  }

  batch.put('v', defaultDeployments());
});

var reserializeCoins = co(function* reserializeCoins() {
  var total = 0;
  var iter, item, hash, old, coins;

  iter = db.iterator({
    gte: pair('c', constants.ZERO_HASH),
    lte: pair('c', constants.MAX_HASH),
    values: true
  });

  for (;;) {
    item = yield iter.next();

    if (!item)
      break;

    hash = item.key.toString('hex', 1, 33);
    old = OldCoins.fromRaw(item.value, hash);

    coins = new Coins();
    coins.version = old.version;
    coins.hash = old.hash;
    coins.height = old.height;
    coins.coinbase = old.coinbase;
    coins.outputs = old.outputs;
    coins.cleanup();

    batch.put(item.key, coins.toRaw());

    if (++total % 100000 === 0)
      console.log('Reserialized %d coins.', total);
  }

  console.log('Reserialized %d coins.', total);
});

function write(data, str, off) {
  if (Buffer.isBuffer(str))
    return str.copy(data, off);
  data.write(str, off, 'hex');
}

function pair(prefix, hash) {
  var key = new Buffer(33);
  if (typeof prefix === 'string')
    prefix = prefix.charCodeAt(0);
  key[0] = prefix;
  write(key, hash, 1);
  return key;
}

function ipair(prefix, num) {
  var key = new Buffer(5);
  if (typeof prefix === 'string')
    prefix = prefix.charCodeAt(0);
  key[0] = prefix;
  key.writeUInt32BE(num, 1, true);
  return key;
}

function defaultOptions() {
  var bw = new BufferWriter();
  var flags = 0;

  if (options.spv)
    flags |= 1 << 0;

  if (options.witness)
    flags |= 1 << 1;

  if (options.prune)
    flags |= 1 << 2;

  if (options.indexTX)
    flags |= 1 << 3;

  if (options.indexAddress)
    flags |= 1 << 4;

  bw.writeU32(options.network.magic);
  bw.writeU32(flags);
  bw.writeU32(0);

  return bw.render();
}

function defaultDeployments() {
  var bw = new BufferWriter();
  var i, deployment;

  bw.writeU8(options.network.deploys.length);

  for (i = 0; i < options.network.deploys.length; i++) {
    deployment = options.network.deploys[i];
    bw.writeU8(deployment.bit);
    bw.writeU32(deployment.startTime);
    bw.writeU32(deployment.timeout);
  }

  return bw.render();
}

co.spawn(function* () {
  yield db.open();
  console.log('Opened %s.', file);
  batch = db.batch();
  yield updateVersion();
  yield updateOptions();
  yield updateDeployments();
  yield reserializeCoins();
  // yield batch.write();
}).then(function() {
  console.log('Migration complete.');
  process.exit(0);
});

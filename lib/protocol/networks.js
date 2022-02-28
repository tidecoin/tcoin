/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('bcrypto/lib/bn.js');

const network = exports;

/*
 * Helpers
 */

function b(hash) {
  return Buffer.from(hash, 'hex');
}

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest', 'simnet'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'tidecoin.ddnsgeek.com', // Pieter Wuille
  'tidecoin.theworkpc.com'

];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xa5cefaec;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 8755;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  1500: b('67916841d2f30b924ae8957b419429efe9a6b487b4d7fc327996eac431ef88e5')  
//  3000: b('98f019517ad92d0221189b40c75f0e5ffe0367a61dfd03f668b3fccfb89fdb0a'),
//  9450: b('c24419a117f4ed9c88ea21342f3f2b91bb549166e4417c8f315a323c1f7edfaf'),
//  14870: b('fbb5bf51bcc94c56c172949709e72a888422cd521b07df7bda862df38b6a8697'),
//  50000: b('d2ecd831d8540be5d022d817a359567b4dddf0c882ee910500120a3a3ed19efd'),
//  100000: b('0dfb6c2b82b85ffce74239d78c49c4483de097f35a3f1401e4de0568a0eaff97'),
//  200000: b('4e802ba65cbc855d549d01a9f55eddc35da3aeb21891f94c6fe7b80143df0f3f'),
//  220000: b('8007f91d7b3187dba0603a05577297e33e9772cae212d5ffe376d9b65119155b'),
//  361470: b('99769661a038d5d1b7901f0357a7177a208a8231aa7d040ea91f7772e2f6c917')
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 1500;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 262800;

/**
 * Genesis block header.
 * @const {Object}
 */

main.genesis = {
  version: 1,
  hash: b('758001d37f6a48809eefae1562da1d391c3866ed773348329f98d80276cc0e48'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('f84f615d33696e93be82ce3d74548329fa42610fbcbe03fdcc2d980b5c3ca050'),
  time: 1609074580,
  bits: 537001983,
  nonce: 13027434,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '010000000000000000000000000000000000000000000000000000000000000000000000'
  + 'f84f615d33696e93be82ce3d74548329fa42610fbcbe03fdcc2d980b5c3ca0509487e8'
  + '5fffff0120855ba8000101000000010000000000000000000000000000000000000000'
  + '000000000000000000000000ffffffff6a04ffff001d01044c61737065637472756d2e'
  + '696565652e6f72672030392f4465632f323032302050686f746f6e6963205175616e74'
  + '756d20436f6d707574657220446973706c617973202753757072656d61637927204f76'
  + '6572205375706572636f6d7075746572732effffffff0100f2052a01000000fd86034d'
  + '8203070903b9fdabf894363dea700a33acedb349b8d3d605ab6a8a997bf885581a5cb6'
  + '56758d18b3d17b144aeba442ccdd5538c4d88dd45d28ea8cf3b1e60f73af23a6ac866d'
  + '56f8c49eabf84ad3e7a90c4b198f7a661cae08869fb07ba0ca2a2dcbbba5619f43e214'
  + 'c088da988eae9a39d6a5992c697cf56b46b6a81d6710b2c84d7134546b3eafc43da645'
  + '4641a85b8a4a09747f4e284be53f03dfcfcbb1c0b9706100e73644fbc8b359bc23508f'
  + '1b4350fe5e2da08a33cf0b5186ce83dd1bcc4a6d6240575d4d08d1e15922994f12ad44'
  + '743e271a76683f66a9273491da8a217dd25a870e37e227577cbd462e97b49c32b2399c'
  + 'c2c9db2ba6955f0143cba62ce9e9b79f844220ad3e382caebd0880d273b3d7590a8ccd'
  + 'f7d26c8a21c64d637d8d5c0dae178513231f532c0b26244d25610cd83931e42c3039e3'
  + 'c15101104e40d53bf4c6f599322e2956e802551803757fde82593892798feaccbdc52b'
  + '495197f276c4858ae16253bb186872c4c87665bae41b1411b26c6ec636dad53619d183'
  + 'd492d6996cc18cb6fad8cb7ef00889a88ce5438603d8b6e90a1cca4203b4d46b4942b5'
  + '9492af797c44f582730834be341178d5ef6e9f82e1caa440686525bf83c753e4a6beb9'
  + '254d1db68c15fbb34906871039f90644da1468493bf729211f308403a911943e066a98'
  + '081d8dd661bd97a6b9e774479d6861afcd048c2a17d70a481d5e38c067b42629bda1ac'
  + 'eba8613ebb1827511545465025886b6510b622816f43f24b1d0300dcc2db24ca7cb02a'
  + 'a6e583e5a6c0e8a7bde1110fd50e37d5557e865d9a66ad9c3d19d6f3a277c71abfa572'
  + 'cb7a647954f5c0293bd298984483ab6ed65b2915921aadc0f98600870bea13668d21b1'
  + 'a31d10ec28622bf9c28e23501846c0fa02ce7158aac4b7977d51debf1168cd03b7d49a'
  + '480c1b385c52d5a079a2be884e45b332003ca198963797a1c45eda0f9a0dce6f03869a'
  + 'e78b937b819d38b7e1120d7fa9a8a96a9fd691d6c6f448a1ebb74862e95d8b7f3cf45d'
  + '99f2981f4f5622ea05d8fc094ec9a0670a2684622c556964e530c1372b442918856aa7'
  + '9494c199a6912ffa2a893c7e7e1c090892264d6e4b583281eb2dc252c61e4904382c56'
  + 'f2c36f736a755b515aa2b108201bf1502de3228cf258700d8a7bec14f113e8d6be8daf'
  + '7796237a5cd9adda37ca201cd9c7f3dedc574b595f21c4865244e5dde5c5c5f330fa2e'
  + '58a988da0e223f0a42e41f9f9dd9908e82a86819ec690c5716ac00000000'
  
/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '01ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 486604799,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '01',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 5 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 7200,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 1,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash:
    b(''),

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 1,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash:
    b(''),

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 1,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash:
    b(''),

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 325000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {

};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 6048; // 95% of 8064

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 8064; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1462060800, // May 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1479168000, // November 15th, 2016.
    timeout: 1510704000, // November 15th, 2017.
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 1496275200, // June 1st, 2017.
    timeout: 1510704000, // November 15th, 2017.
    threshold: 269, // 80%
    window: 336, // ~2.33 days
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.segsignal,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x7d,
  xpubkey: 0x0768acde,
  xprivkey: 0x0768feb1,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x21,
  scripthash: 0x41,
  bech32: 'tbc'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 8332;

/**
 * Default wallet port.
 * @const {Number}
 * @default
 */

main.walletPort = 8334;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 5000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;



































/*
 * Testnet (v3)
 * https://en.bitcoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'testnet-seed.bitcoin.jonasschnelli.ch', // Jonas Schnelli
  'seed.tbtc.petertodd.org', // Peter Todd
  'testnet-seed.bluematt.me', // Matt Corallo
  'testnet-seed.bitcoin.schildbach.de', // Andreas Schildbach
  'seed.testnet.bitcoin.sprovoost.nl' // Sjors Provoost
];

testnet.magic = 0x0709110b;

testnet.port = 18333;

testnet.checkpointMap = {
  546: b('70cb6af7ebbcb1315d3414029c556c55f3e2fc353c4c9063a76c932a00000000'),
  10000: b('02a1b43f52591e53b660069173ac83b675798e12599dbb0442b7580000000000'),
  50000: b('0c6ceabe803cec55ba2831e445956d0a43ba9521743a802cddac7e0700000000'),
  90000: b('cafc21e17faf90461a5905aa03302c394912651ed9475ae711723e0d00000000'),
  100000: b('1e0a16bbadccde1d80c66597b1939e45f91b570d29f95fc158299e0000000000'),
  140000: b('92c0877b54c556889b72175ccbe0c91a1208f6ef7efb2c006101062300000000'),
  170000: b('508125560d202b89757889bb0e49c712477be20440058f05db4f0e0000000000'),
  210000: b('32365454b5f29a826bff8ad9b0448cad0072fc73d50e482d91a3dece00000000'),
  230000: b('b11a447e62643e0b27406eb0fc270cb8126d7b5b70822fb642d9513400000000'),
  270000: b('1c42b811cf9c163932f6e95ec55bf9b5e2cb5324e7e93001572e000000000000'),
  300000: b('a141bf3972424853f04367b47995e220e0b5a2706e5618766f22000000000000'),
  340000: b('67edd4d92e405608109164b15f92b193377d49325b0ed036739c010000000000'),
  350000: b('592b44bc0f7a4286cf07ead8497114c6952c1c7dea7305193deacf8e00000000'),
  390000: b('f217e183484fb6d695609cc71fa2ae24c3020943407e0150b298030000000000'),
  420000: b('de9e73a3b91fbb014e036e8583a17d6b638a699aeb2de8573d12580800000000'),
  460000: b('2e8baaffc107f15c87aebe01664b63d07476afa53bcbada1281a030000000000'),
  500000: b('06f60922a2aab2757317820fc6ffaf6a470e2cbb0f63a2aac0a7010000000000'),
  540000: b('8dd0bebfbc4878f5af09d3e848dcc57827d2c1cebea8ec5d8cbe420500000000'),
  570000: b('87acbd4cd3c40ec9bd648f8698ed226b31187274c06cc7a9af79030000000000'),
  600000: b('169a05b3bb04b7d13ad628915630900a5ed2e89f3a9dc6064f62000000000000'),
  630000: b('bbbe117035432a6a4effcb297207a02b031735b43e0d19a9217c000000000000'),
  670000: b('080bfe75caed8624fcfdfbc65973c8f962d7bdc495a891f5d16b7d0000000000'),
  700000: b('c14d3f6a1e7c7d66fd940951e44f3c3be1273bea4d2ab1786140000000000000'),
  740000: b('b3b423f0462fd78a01e4f1a59a2737a0525b5dbb9bba0b4634f9000000000000'),
  780000: b('0381582e34c3755964dc2813e2b33e521e5596367144e1670851050000000000'),
  800000: b('03b5f8ab257e02903f509f5ff2935220eec2e77b1819651d099b200000000000'),
  840000: b('dac1648107bd4394e57e4083c86d42b548b1cfb119665f179ea80a0000000000'),
  880000: b('ff90b4bb07eded8e96715bf595c09c7d21dd8c61b8306ff48705d60000000000'),
  900000: b('9bd8ac418beeb1a2cf5d68c8b5c6ebaa947a5b766e5524898d6f350000000000'),
  940000: b('c98f1651a475b00d12f8c25eb166ee843affaa90610e36a19d68030000000000'),
  980000: b('cc8e9774542d044a9698ca2336ae02d5987157e676f1c76aa3877c0000000000'),
  1010000:
    b('9d9fb11abc2712d80368229e97b8d827b2a07d27eb5335e5c924000000000000'),
  1050000: b('d8190cf0af7f08e179cab51d67db0b44b87951a78f7fdc31b4a01a0000000000')
};

testnet.lastCheckpoint = 1050000;

testnet.halvingInterval = 210000;

testnet.genesis = {
  version: 1,
  hash: b('43497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1296688602,
  bits: 486604799,
  nonce: 414098458,
  height: 0
};

testnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5'
  + '494dffff001d1aa4ae1801010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

testnet.pow = {
  limit: new BN(
    '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 486604799,
  chainwork: new BN(
    '000000000000000000000000000000000000000000000062b7123cfd7d09f7b6',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: 21111,
  bip34hash:
    b('f88ecd9912d00d3f5c2a8e0f50417d3e415c75b3abe584346da9b32300000000'),
  bip65height: 581885,
  bip65hash:
    b('b61e864fbec41dfaf09da05d1d76dc068b0dd82ee7982ff255667f0000000000'),
  bip66height: 330776,
  bip66hash:
    b('82a14b9e5ea81d4832b8e2cd3c2a6092b5a3853285a8995ec4c8042100000000'),
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 1512; // 75% for testchains

testnet.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1456790400, // March 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1462060800, // May 1st 2016
    timeout: 1493596800, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.segsignal,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  bech32: 'tb'
};

testnet.requireStandard = false;

testnet.rpcPort = 18332;

testnet.walletPort = 18334;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [];

regtest.magic = 0xdab5bffa;

regtest.port = 48444;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: b('06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1296688602,
  bits: 545259519,
  nonce: 2,
  height: 0
};

regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4adae5'
  + '494dffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 100000000,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: -1,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  bech32: 'bcrt'
};

regtest.requireStandard = false;

regtest.rpcPort = 48332;

regtest.walletPort = 48334;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Simnet (btcd)
 */

const simnet = {};

simnet.type = 'simnet';

simnet.seeds = [
  '127.0.0.1'
];

simnet.magic = 0x12141c16;

simnet.port = 18555;

simnet.checkpointMap = {};

simnet.lastCheckpoint = 0;

simnet.halvingInterval = 210000;

simnet.genesis = {
  version: 1,
  hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a'),
  time: 1401292357,
  bits: 545259519,
  nonce: 2,
  height: 0
};

simnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
  + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

simnet.pow = {
  limit: new BN(
    // High target of 0x207fffff (545259519)
    '7fffff0000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

simnet.block = {
  bip34height: 0,
  bip34hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  bip65height: 0,
  bip65hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  bip66height: 0,
  bip66hash:
    b('f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68'),
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

simnet.bip30 = {};

simnet.activationThreshold = 75; // 75% for testchains

simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

simnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0, // March 1st, 2016
    timeout: 0xffffffff, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // May 1st 2016
    timeout: 0xffffffff, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

simnet.deploys = [
  simnet.deployments.csv,
  simnet.deployments.segwit,
  simnet.deployments.segsignal,
  simnet.deployments.testdummy
];

simnet.keyPrefix = {
  privkey: 0x64,
  xpubkey: 0x0420bd3a,
  xprivkey: 0x0420b900,
  xpubkey58: 'spub',
  xprivkey58: 'sprv',
  coinType: 115
};

simnet.addressPrefix = {
  pubkeyhash: 0x3f,
  scripthash: 0x7b,
  bech32: 'sb'
};

simnet.requireStandard = false;

simnet.rpcPort = 18556;

simnet.walletPort = 18558;

simnet.minRelay = 1000;

simnet.feeRate = 20000;

simnet.maxFeeRate = 60000;

simnet.selfConnect = false;

simnet.requestMempool = false;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
network.simnet = simnet;

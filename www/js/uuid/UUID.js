/**
 * this.UUID.js: The RFC-compliant UUID generator for JavaScript.
 *
 * @fileOverview
 * @author  LiosK
 * @version 3.2 beta
 * @license The MIT License: Copyright (c) 2010 LiosK.
 */

// Core Component {{{

/** @constructor */
dojo.provide('uuid.UUID');

uuid = {UUID: function(){}};

/**
 * The simplest function to get an UUID string.
 * @returns {string} A version 4 UUID string.
 */
uuid.UUID.generate = function() {
  var rand = uuid.UUID._getRandomInt, hex = uuid.UUID._hexAligner;
  return  hex(rand(32), 8)          // time_low
        + "-"
        + hex(rand(16), 4)          // time_mid
        + "-"
        + hex(0x4000 | rand(12), 4) // time_hi_and_version
        + "-"
        + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
        + "-"
        + hex(rand(48), 12);        // node
};

/**
 * Returns an unsigned x-bit random integer.
 * @param {int} x A positive integer ranging from 0 to 53, inclusive.
 * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
 */
uuid.UUID._getRandomInt = function(x) {
  if (x <   0) return NaN;
  if (x <= 30) return (0 | Math.random() * (1 <<      x));
  if (x <= 53) return (0 | Math.random() * (1 <<     30))
                    + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
  return NaN;
};

/**
 * Returns a function that converts an integer to a zero-filled string.
 * @param {int} radix
 * @returns {function(num&#44; length)}
 */
uuid.UUID._getIntAligner = function(radix) {
  return function(num, length) {
    var hex = num.toString(radix), i = length - hex.length, z = "0";
    for (; i > 0; i >>>= 1, z += z) { if (i & 1) { hex = z + hex; } }
    return hex;
  };
};

uuid.UUID._hexAligner = uuid.UUID._getIntAligner(16);

// }}}

// UUID Object Component {{{

/**
 * Names of each UUID field.
 * @type string[]
 * @constant
 * @since 3.0
 */
uuid.UUID.FIELD_NAMES = ["timeLow", "timeMid", "timeHiAndVersion",
                    "clockSeqHiAndReserved", "clockSeqLow", "node"];

/**
 * Sizes of each UUID field.
 * @type int[]
 * @constant
 * @since 3.0
 */
uuid.UUID.FIELD_SIZES = [32, 16, 16, 8, 8, 48];

/**
 * Generates a version 4 {@link UUID}.
 * @returns {UUID} A version 4 {@link UUID} object.
 * @since 3.0
 */
uuid.UUID.genV4 = function() {
  var rand = uuid.UUID._getRandomInt;
  return new UUID()._init(rand(32), rand(16), // time_low time_mid
                          0x4000 | rand(12),  // time_hi_and_version
                          0x80   | rand(6),   // clock_seq_hi_and_reserved
                          rand(8), rand(48)); // clock_seq_low node
};

/**
 * Converts hexadecimal UUID string to an {@link UUID} object.
 * @param {string} strId UUID hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
 * @returns {UUID} {@link UUID} object or null.
 * @since 3.0
 */
uuid.UUID.parse = function(strId) {
  var r, p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
  if (r = p.exec(strId)) {
    return new UUID()._init(parseInt(r[1], 16), parseInt(r[2], 16),
                            parseInt(r[3], 16), parseInt(r[4], 16),
                            parseInt(r[5], 16), parseInt(r[6], 16));
  } else {
    return null;
  }
};

/**
 * Initializes {@link UUID} object.
 * @param {uint32} [timeLow=0] time_low field (octet 0-3).
 * @param {uint16} [timeMid=0] time_mid field (octet 4-5).
 * @param {uint16} [timeHiAndVersion=0] time_hi_and_version field (octet 6-7).
 * @param {uint8} [clockSeqHiAndReserved=0] clock_seq_hi_and_reserved field (octet 8).
 * @param {uint8} [clockSeqLow=0] clock_seq_low field (octet 9).
 * @param {uint48} [node=0] node field (octet 10-15).
 * @returns {UUID} uuid.
 */
uuid.UUID.prototype._init = function() {
  var names = uuid.UUID.FIELD_NAMES, sizes = uuid.UUID.FIELD_SIZES;
  var bin = uuid.UUID._binAligner, hex = uuid.UUID._hexAligner;

  /**
   * List of UUID field values (as integer values).
   * @type int[]
   */
  uuid.intFields = new Array(6);

  /**
   * List of UUID field values (as binary bit string values).
   * @type string[]
   */
  uuid.bitFields = new Array(6);

  /**
   * List of UUID field values (as hexadecimal string values).
   * @type string[]
   */
  uuid.hexFields = new Array(6);

  for (var i = 0; i < 6; i++) {
    var intValue = parseInt(arguments[i] || 0);
    uuid.intFields[i] = uuid.intFields[names[i]] = intValue;
    uuid.bitFields[i] = uuid.bitFields[names[i]] = bin(intValue, sizes[i]);
    uuid.hexFields[i] = uuid.hexFields[names[i]] = hex(intValue, sizes[i] / 4);
  }

  /**
   * UUID version number defined in RFC 4122.
   * @type int
   */
  uuid.version = (uuid.intFields.timeHiAndVersion >> 12) & 0xF;

  /**
   * 128-bit binary bit string representation.
   * @type string
   */
  uuid.bitString = uuid.bitFields.join("");

  /**
   * UUID hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @type string
   */
  uuid.hexString = uuid.hexFields[0] + "-" + uuid.hexFields[1] + "-" + uuid.hexFields[2]
                 + "-" + uuid.hexFields[3] + uuid.hexFields[4] + "-" + uuid.hexFields[5];

  /**
   * UUID string representation as a URN ("urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @type string
   */
  uuid.urn = "urn:uuid:" + uuid.hexString;

  return this;
};

uuid.UUID._binAligner = uuid.UUID._getIntAligner(2);

/**
 * Returns UUID string representation.
 * @returns {string} {@link UUID#hexString}.
 */
uuid.UUID.prototype.toString = function() { return uuid.hexString; };

/**
 * Tests if two {@link UUID} objects are equal.
 * @param {UUID} uuid
 * @returns {bool} True if two {@link UUID} objects are equal.
 */
uuid.UUID.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) { return false; }
  for (var i = 0; i < 6; i++) {
    if (uuid.intFields[i] !== uuid.UUID.intFields[i]) { return false; }
  }
  return true;
};

// }}}

// UUID Version 1 Component {{{

/**
 * Generates a version 1 {@link UUID}.
 * @returns {UUID} A version 1 {@link UUID} object.
 * @since 3.0
 */
uuid.UUID.genV1 = function() {
  var now = new Date().getTime(), st = uuid.UUID._state;
  if (now != st.timestamp) {
    if (now < st.timestamp) { st.sequence++; }
    st.timestamp = now;
    st.tick = uuid.UUID._getRandomInt(4);
  } else if (Math.random() < uuid.UUID._tsRatio && st.tick < 9984) {
    // advance the timestamp fraction at a probability
    // to compensate for the low timestamp resolution
    st.tick += 1 + uuid.UUID._getRandomInt(4);
  } else {
    st.sequence++;
  }

  // format time fields
  var tf = uuid.UUID._getTimeFieldValues(st.timestamp);
  var tl = tf.low + st.tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'

  // format clock sequence
  st.sequence &= 0x3FFF;
  var cshar = (st.sequence >>> 8) | 0x80; // set variant '10'
  var csl = st.sequence & 0xFF;

  return new UUID()._init(tl, tf.mid, thav, cshar, csl, st.node);
};

/**
 * Re-initializes version 1 UUID state.
 * @since 3.0
 */
uuid.UUID.resetState = function() {
  uuid.UUID._state = new uuid.UUID._state.constructor();
};

/**
 * Probability to advance the timestamp fraction: the ratio of tick movements to sequence increments.
 * @type float
 */
uuid.UUID._tsRatio = 1 / 4;

/**
 * Persistent state for UUID version 1.
 * @type UUIDState
 */
uuid.UUID._state = new function UUIDState() {
  var rand = uuid.UUID._getRandomInt;
  uuid.timestamp = 0;
  uuid.sequence = rand(14);
  uuid.node = (rand(8) | 1) * 0x10000000000 + rand(40); // set multicast bit '1'
  uuid.tick = rand(4);  // timestamp fraction smaller than a millisecond
};

/**
 * @param {Date|int} time ECMAScript Date Object or milliseconds from 1970-01-01.
 * @returns {object}
 */
uuid.UUID._getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return  { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
            mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

// }}}

// Backward Compatibility Component {{{

/**
 * Reinstalls {@link uuid.UUID.generate} method to emulate the interface of uuid.UUID.js version 2.x.
 * @since 3.1
 * @deprecated Version 2.x. compatible interface is not recommended.
 */
uuid.UUID.makeBackwardCompatible = function() {
  var f = uuid.UUID.generate;
  uuid.UUID.generate = function(o) {
    return (o && o.version == 1) ? uuid.UUID.genV1().hexString : f.call(UUID);
  };
  uuid.UUID.makeBackwardCompatible = function() {};
};
// }}}

// vim: et ts=2 sw=2 fdm=marker fmr&
